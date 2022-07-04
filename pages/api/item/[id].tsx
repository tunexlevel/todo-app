import { ItemModel } from "../../../src/components/Item/ItemModel"
import type { NextApiRequest, NextApiResponse } from 'next'




export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const data = req.query;

    const item = ItemModel.getById(parseInt(data.id))

    if (item.length < 1) {
        res.status(404).json({ message: 'Item not found!' })
    }
    else {
        res.status(200).json(item[0])
    }
}