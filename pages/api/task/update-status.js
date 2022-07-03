import { ItemModel } from "../../../src/components/Item/ItemModel"


export default function handler(req, res) {

    const task = req.body;

    if(!task.itemId){
        return res.status(200).json({message: 'Item ID is required', status:"error"})
    }

    if(!task.id){
        return res.status(200).json({message: 'Task ID is required', status:"error"})
    }

    const getItem = ItemModel.getById(task.itemId)

    if(!getItem.length){
        return res.status(200).json({message: 'Item  not found', status:"error"})
    }

    const getTask = ItemModel.getByTaskId(task.id, getItem[0].tasks)
    console.log(getTask)
    if(!getTask.length){
        return res.status(200).json({message: 'Task  not found', status:"error"})
    }

    try{
        ItemModel.updateTaskStatus(task, getItem[0])
        const item = ItemModel.getById(task.itemId)
        res.status(200).json({message: 'Task updated successfully', item: item[0]})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }
}