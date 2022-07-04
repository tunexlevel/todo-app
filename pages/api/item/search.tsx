import { ItemModel } from "../../../src/components/Item/ItemModel"
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const item = req.body;
    if(!item.keyword){
        return res.status(200).json({message: 'Keyword is required', status:"error"})
    }

    try{
        const result =  ItemModel.find(item.keyword, 5)
        res.status(200).json(result)
    }
    catch(e){
        res.status(400).json({ message: 'Internal system error!'})
    }

}