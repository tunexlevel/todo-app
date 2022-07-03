import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Delete } from '@mui/icons-material';
import Paper from '@mui/material/Paper';

export default function SingleTask({ item: value, checkbox, deleteBtn, handleDelete, id, handleToggle, checked }) {

  const labelId = `checkbox-list-label-${value.id}`;

  return (
    <Paper elevation={0} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "inherit" }}>
      <ListItem
        key={value}
        secondaryAction={
          <>
            {!deleteBtn &&
              <IconButton onClick={() => { handleDelete(id) }} edge="end" aria-label="comments">
                <Delete color="error" />
              </IconButton>
            }
          </>
        }
        disablePadding
      >
        {
          checkbox ?
            <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>

              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>

              <ListItemText sx={{ textDecoration: checked.indexOf(value.id) !== -1 ? "line-through" : "none" }} id={labelId} primary={value.title} />
            </ListItemButton> :
            <ListItemButton  dense>
                <ListItemText  primary={value} />
            </ListItemButton>
        }
      </ListItem>
    </Paper>
  );
}
