import * as React from 'react';
import List from '@mui/material/List';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SingleItem from './SingleItem';
import { Alert, Grid, Typography } from '@mui/material';
import SingleTask from './SingleTask';

import { Item } from '../../models/interface';


export interface ItemListType {
  items: Item[],
  searching: boolean,
  checkbox: boolean,
  total: number,
  handleDelete: (id: number) => void,
  handleToggle: (id: number) => void,
  checked: number[]
}



export default function ItemList({ items, searching, handleDelete, total, checked, handleToggle: handleToggle }: ItemListType) {


  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography component="h1" variant="caption">
              Recent List
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography component="h1" variant="caption">
              <Chip avatar={<Avatar>{total}</Avatar>} color="success" label={`Total Items`} />
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {!items.length ? (
          searching ? <Alert severity="info">No result found!</Alert> : <Alert severity="info">No item added yet..!</Alert>)
          :
          items.map((value, index) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <SingleItem
                handleToggle={handleToggle}
                checked={checked}
                handleDelete={handleDelete}
                item={value}
                key={index} />
            );
          })
        }
      </List>
    </Box>
  );
}
