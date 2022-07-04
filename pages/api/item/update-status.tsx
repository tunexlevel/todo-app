import { ItemModel } from "../../../src/components/Item/ItemModel"
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const item = req.body;

    try{
        ItemModel.updateStatus(item)
        const itemLatest = ItemModel.getById(item.id)
        res.status(200).json({message: 'Item status updated successfully', item: itemLatest[0], status:"success"})
    }
    catch(e){
        //console.log(e.message)
        res.status(400).json({ message: 'Internal system error!'})
    }

}