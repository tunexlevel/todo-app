import fs from "fs";

// data in JSON file for todo list
import items from "../../storage/data.json";

export const ItemModel = {
    getAll: () => items,
    getAllWithLimit: limit => {
        const nItems = items.sort((x, y) => y.id - x.id)
        return { items: nItems.slice(0, limit), total: items.length }
    },
    getById: id => items.filter(x => x.id.toString() === id.toString()),
    getByTaskId: (id, item) => item.filter(x => x.id.toString() === id.toString()),

    find: (x, limit) => {
        const searchResult = items.filter(item => {
            //use regular expression to filter the item by title
            const re = new RegExp(`\\b${x}\\b`, 'gi');
            return re.test(item.title);
        })

        const nItems = searchResult.sort((x, y) => y.id - x.id)
        return { items: nItems.slice(0, limit), total: items.length }
    },
    create,
    update,
    updateStatus,
    delete: _delete,
    deleteTask,
    updateTaskStatus
};

function create(item) {
    //generate new item id
    item.id = items.length ? Math.max(...items.map(x => x.id)) + 1 : 1;


    item.status = 0; //unfinished task
    item.created_at = new Date().toISOString();
    item.updated_at = new Date().toISOString();
    item.tasks = item.tasks.map((task, index) => {
        return { id: index+1, title: task, status:0 }
    })

    // add and save item
    items.push(item);
    return saveData();
}

function update(param) {

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

function updateStatus(param) {

    items = items.map(x => {
        if (x.id.toString() === param.id.toString()) {
            x.status = param.status;
            x.updated_at = new Date().toISOString();
            if(parseInt(param.status) === 1){
                x.tasks = x.tasks.map(i=>{
                    return {...i, status:1}
                })
            }
        }
        return x;
    });

    saveData();
    
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted item and save
    items = items.filter(x => x.id.toString() !== id.toString());
    saveData();

}


function deleteTask(id, item) {
    // filter out deleted item and save
    const newTasks = item.filter(x => x.id.toString() !== id.toString())
    items[item.id] = newTasks;

    saveData();

}

function updateTaskStatus(task, item) {
    // filter out deleted item and save
    items = items.map(x => {
        if (x.id.toString() === item.id.toString()) {
            x.updated_at = new Date().toISOString();
            let statusCount = 0;
            x.tasks = x.tasks.map(i => {
                if (i.id.toString() === task.id.toString()) {
                    i.status = task.status;
                }

                if(parseInt(i.status) > 0){
                    statusCount++;
                }
                return i
            })
             
            x.status = statusCount === x.tasks.length ? 1:0

        }
        return x;
    });

    saveData();

}

// private helper functions

function saveData() {
    try {
        fs.writeFileSync('./storage/data.json', JSON.stringify(items), null, 4);
        return 200
    }
    catch (e) {
        console.log(e.message)
        return e.message
    }
}