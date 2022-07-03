import { ItemModel } from "../../../src/Item/ItemModel"



export default function handler(req, res) {

    const item = req.body;
    if(!item.keyword){
        return res.status(200).json({message: 'Keyword is required', status:"error"})
    }

    try{
        const result =  ItemModel.find(item.keyword, 5)
        res.status(200).json(result)
    }
    catch(e){
        res.status(400).json({ message: 'Internal system error!', reason:e.message})
    }

}