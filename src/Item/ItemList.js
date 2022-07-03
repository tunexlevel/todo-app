import * as React from 'react';
import List from '@mui/material/List';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SingleItem from './SingleItem';
import { Grid, Typography } from '@mui/material';
import SingleTask from './SingleTask';

export default function ItemList({ items, searching, handleDelete, total, checked, handleToggle: handleToggle }) {


  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography component="h1" variant="caption">
              Recent List
            </Typography>
          </Grid>
          <Grid item xs={4}  textAlign="right">
            <Typography component="h1" variant="caption">
              <Chip avatar={<Avatar>{total}</Avatar>} color="success"  label={`Total Items`} />
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {!items.length ? (searching == 1 ?
          <SingleTask 
            handleToggle={handleToggle} 
            deleteBtn={true} 
            checked={[-1]}
            item={"No result found!"} /> : 
          <SingleTask 
            handleToggle={handleToggle}
            checked={[-1]}
            deleteBtn={true} item={"No item added yet..."} />) :
          items.map((value, index) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <SingleItem 
                handleToggle={handleToggle} 
                checked={checked} 
                handleDelete={handleDelete} 
                item={value} key={index} />
            );
          })
        }
      </List>
    </Box>
  );
}
