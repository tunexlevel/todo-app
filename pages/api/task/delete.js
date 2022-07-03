import { ItemModel } from "../../../src/Item/ItemModel"


export default function handler(req, res) {

    const task = req.body;

    if(!item.taskId){
        return res.status(200).json({message: 'Item ID is required', status:"error"})
    }

    if(!item.id){
        return res.status(200).json({message: 'Task ID is required', status:"error"})
    }

    const getItem = ItemModel.getById(item_id)

    if(!getItem.length){
        return res.status(200).json({message: 'Item  not found', status:"error"})
    }

    const getTask = ItemModel.getByTaskId(item_id, getItem)
    if(!getTask.length){
        return res.status(200).json({message: 'Task  not found', status:"error"})
    }

    try{
        ItemModel.deleteTask(task.id, getItem[0])
        const item = ItemModel.getById(task.item_id)
        res.status(200).json({message: 'Task deleted successfully', item})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }
}