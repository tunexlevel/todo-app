import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Delete from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { Item } from '../../models/interface';
import moment from 'moment';


export interface SingleItemType {
  item: Item,
  handleDelete: (id: number) => void, 
  handleToggle: (id: number) => void,
  checked: number[]
}


export default function SingleItem({ item, handleDelete, checked, handleToggle }: SingleItemType) {
  
  const labelId = `checkbox-list-label-${item.id}`;

  return (
    <Paper elevation={0} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "inherit" }}>
      <ListItem
        key={item.id}
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="comments">
              <Link href={"/item/"+item.id}>
                <CommentIcon color="primary"  />
              </Link>
            </IconButton>
            <IconButton onClick={()=> {handleDelete(item.id)}} edge="end" aria-label="comments">
              <Delete color="error"  />
            </IconButton>
          </>
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={()=>handleToggle(item.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(item.id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText 
              id={labelId} 
              sx={{textDecoration: checked.indexOf(item.id) !== -1 ? "line-through":"none"}} 
              primary={item.title} 
              secondary={
                <Typography sx={{ opacity: 0.5 }} 
                  component="h1" 
                  variant="caption">{moment(item.created_at).format('DD-MM-YY HH:mm')}</Typography>
              } 
            />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
