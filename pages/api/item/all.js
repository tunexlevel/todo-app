import { ItemModel } from "../../../src/Item/ItemModel"



export default function handler(req, res) {

    try{
        const items = ItemModel.getAllWithLimit(5)
        return res.status(200).json(items)
    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }

}