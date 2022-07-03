import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from '../NavBar/NavBar';
import SearchBar from './SearchBar';
import ItemList from '../Item/ItemList.js'
import ViewMore from '../ViewMore/ViewMore';
import { LocationSearching } from '@mui/icons-material';
import axios from 'axios';


const HomeView = ({ Items }) => {

  const [defaultItem, setDefaultItem] = useState(Items.items || []);
  const [items, setItems] = useState(Items.items || []);
  const [total, setTotal] = useState(Items.total || 0);
  const [searching, setSearching] = useState(0);

  const checkedItems = () => {
    if (items.length > 0) {
      const nItem = items.filter(x => parseInt(x.status) === 1)
      return [...nItem.map(x => parseInt(x.id))]
    }
    return [0]
  }

  const [checked, setChecked] = useState(checkedItems()); //list of the current item ids


  const handleToggle = (id) => async () => {
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
      alert(e.message || "Internal system error");
    }


  };

  const handleSearch = async (event) => {
    const keyword = event.target.value
    if (!keyword) {
      setItems(defaultItem)
    }
    else {
      try {
        setSearching(1)
        const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/search`, { keyword })
        setItems(result.data.items || [])
      }
      catch (e) {
        alert(e.message || "Internal system error");
      }
      //const newItems = Items.filter(item => item.title.toLowerCase() == keyword.toLowerCase())

    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/delete`, { id })
      setItems(result.data.items)
      setTotal(result.data.total)
    }
    catch (e) {
      alert(e.message || "Internal system error");
    }
  }

  return (
    <Box>
      <SearchBar handleSearch={handleSearch} />
      <ItemList checked={checked} handleToggle={handleToggle} total={total} searching={searching} handleDelete={handleDelete} items={items} />
      {Items && Items.length > 5 && <ViewMore />}
    </Box>
  )
}


export default HomeView





