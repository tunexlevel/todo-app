import { ItemModel } from "../../../src/components/Item/ItemModel"



export default function handler(req, res) {

    const item = req.body;

    try{
        if(!item.title){
            return res.status(200).json({message: 'Title is required', status:"error"})
        }

        if(!item.tasks || item.tasks.length < 1){
            return res.status(200).json({message: 'Task is required', status:"error"})
        }

        ItemModel.create(item)
        res.status(200).json({message: 'Item added successfully'})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }

}