import { ItemModel } from "../../../src/components/Item/ItemModel"


export default function handler(req, res) {

    const item = req.body;

    try{
        ItemModel.delete(item.id)
        const items = ItemModel.getAllWithLimit(5)
        res.status(200).json({message: 'Item deleted successfully', ...items})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }
}