import Items from "../../../storage/data.json"

export default function handler(req, res) {

    const {id} = req.query;

    const item = Items.filter(item => item.id == id)

    if(item.length < 1){
        res.status(404).json({ message: 'Item not found!'})
    }
    else{
        res.status(200).json(item[0])
    }
}