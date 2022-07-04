import fs from "fs";

// data in JSON file for todo list
import items from "../../../storage/data.json";
import { Item, Task } from "../../models/interface";

export const ItemModel = {
    getAll: () => items,
    getAllWithLimit,
    getById,
    getByTaskId,
    find,
    create,
    update,
    updateStatus,
    delete: _delete,
    deleteTask,
    updateTaskStatus
};

function find(x: string, limit: number): { items: Item[], total: number } {
    const searchResult = items.filter(item => {
        //use regular expression to filter the item by title
        const re = new RegExp(`\\b${x}\\b`, 'gi');
        return re.test(item.title);
    })

    const nItems = searchResult.sort((x, y) => y.id - x.id)
    return { items: nItems.slice(0, limit), total: items.length }
}

function getByTaskId(id: number, task: Task[]): Task[] {

    return task.filter(x => x.id  === id )
}

function getById(id: number): Item[] {
    return items.filter(x => x.id === id)
}

function getAllWithLimit(limit: number): { items: Item[], total: number } {
    const nItems = items.sort((x, y) => y.id - x.id)
    return { items: nItems.slice(0, limit), total: items.length }
}

function create(item: Item) {
    //generate new item id
    item.id = items.length ? Math.max(...items.map(x => x.id)) + 1 : 1;

    item.status = 0; //unfinished task
    item.created_at = new Date().toISOString();
    item.updated_at = new Date().toISOString();
    item.tasks = item.tasks;
    // add and save item
    items.push(item);
    saveData();
}

function update(param: Item) {

    items.map(x => {
        if (x.id.toString() === param.id.toString()) {
            x.title = param.title;
            x.due_date = param.due_date;
            x.tasks = param.tasks;
            x.updated_at = new Date().toISOString();
        }
    });

    saveData();
}

function updateStatus(param: Item) {

    items.map(x => {
        if (x.id.toString() === param.id.toString()) {
            x.status = param.status;
            x.updated_at = new Date().toISOString();
            if (param.status === 1) {
                x.tasks = x.tasks.map(i => {
                    return { ...i, status: 1 }
                })
            }
        }
        return x;
    });

    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
    // filter out deleted item and save
    items.filter(x => x.id.toString() !== id.toString());

    saveData();
}


function deleteTask(id: number, item: Item) {
    // filter out deleted item and save
    item.tasks.filter(x => x.id.toString() !== id.toString())

    saveData();
}

function updateTaskStatus(task: Task, item: Item) {
    // filter out deleted item and save
    const getTask = ItemModel.getByTaskId(task.id, item.tasks)

    items.map(x => {
        if (x.id.toString() === item.id.toString()) {
            x.updated_at = new Date().toISOString();
            let statusCount = 0;
            //check if the task is a new task
            if (!getTask.length) {
                x.tasks.push(task) //add the new task
            }
            x.tasks = x.tasks.map(i => {
                //update for only existing task
                if (getTask.length && i.id.toString() === task.id.toString()) {
                    i.status = task.status;
                }

                if (i.status > 0) {
                    statusCount++;
                }
                return i
            })

            x.status = statusCount === x.tasks.length ? 1 : 0

        }
        return x;
    });

    saveData();

}

// private helper functions

function saveData() {
    try {
        fs.writeFileSync('./storage/data.json', JSON.stringify(items), null);
        return 200
    }
    catch (e) {
        console.log(e)
        return 500
    }
}