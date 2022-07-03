import { ItemModel } from "../../../src/components/Item/ItemModel"


export default function handler(req, res) {

    const data = req.body;

    if(!data.itemId){
        return res.status(200).json({message: 'Item ID is required', status:"error"})
    }

    if(!data.task){
        return res.status(200).json({message: 'A Task is required', status:"error"})
    }

    const getItem = ItemModel.getById(data.itemId)

    if(!getItem.length){
        return res.status(200).json({message: 'Item  not found', status:"error"})
    }

    try{
        ItemModel.updateTaskStatus(data.task, getItem[0])
        const item = ItemModel.getById(data.itemId)
        res.status(200).json({message: 'Task updated successfully', item: item[0]})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }
}