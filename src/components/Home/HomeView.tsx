import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from '../NavBar/NavBar';
import SearchBar from './SearchBar';
import ItemList from '../Item/ItemList'
import ViewMore from '../ViewMore/ViewMore';
import { LocationSearching } from '@mui/icons-material';
import axios from 'axios';
import { Item } from '../../models/interface';


export interface Items {
  items: Item[],
  total: number
}

export interface HomeViewType {
  Items: Items
}

const HomeView = ({ Items }: HomeViewType) => {

  const [defaultItem, setDefaultItem] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);
  const [checked, setChecked] = useState<number[]>([0]); //list of the current item ids

  useEffect(()=>{
    setItems(Items.items)
    setTotal(Items.total)
    setDefaultItem(Items.items)
  }, [Items])

  useEffect(()=>{
    const checkedItems = () => {
      if (items.length > 0) {
        const nItem = items.filter(x => x.status === 1)
        return [...nItem.map(x => x.id)]
      }
      return [0]
    }
    setChecked(checkedItems())
  }, [items])


  const handleToggle = async (id: number) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    let status = 0;
    if (currentIndex === -1) {
      status = 1;
      newChecked.push(id);

    } else {
      newChecked.splice(currentIndex, 1);
    }

    try {
      setChecked(newChecked);
      await axios.post(process.env.NEXT_PUBLIC_API + `/item/update-status`, { id, status })
    }
    catch (e) {
      //alert(e.message || "Internal system error");
    }


  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const keyword = event.target.value
    if (!keyword) {
      setItems(defaultItem)
    }
    else {
      try {
        setSearching(true)
        const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/search`, { keyword })
        setItems(result.data.items || [])
      }
      catch (e) {
        //alert(e.message || "Internal system error");
      }
      //const newItems = Items.filter(item => item.title.toLowerCase() == keyword.toLowerCase())

    }
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/delete`, { id })
      setItems(result.data.items)
      setTotal(result.data.total)
    }
    catch (e) {
      //alert(e.message || "Internal system error");
    }
  }

  return (
    <Box>
      <SearchBar handleSearch={handleSearch} />
      <ItemList checkbox={true} checked={checked} handleToggle={handleToggle} total={total} searching={searching} handleDelete={handleDelete} items={items} />
      {Items.items?.length > 5 && <ViewMore />}
    </Box>
  )
}


export default HomeView





