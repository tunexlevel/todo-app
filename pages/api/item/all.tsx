import { ItemModel } from "../../../src/components/Item/ItemModel"
import type { NextApiRequest, NextApiResponse } from 'next'




export default function handler(req: NextApiRequest, res: NextApiResponse) {

    try{
        const items = ItemModel.getAllWithLimit(5)
        return res.status(200).json(items)
    }
    catch(e){
        //console.log(e.message)
        return res.status(400).json({ message: 'Internal system error!'})
    }

}