import { ItemModel } from "../../../src/Item/ItemModel"


export default function handler(req, res) {

    const item = req.body;

    try{
        ItemModel.update(item)
        res.status(200).json({message: 'Item updated successfully'})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }
}