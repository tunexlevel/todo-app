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
import { Item, Task } from '../../models/interface';


export interface SingleTaskType {
  task: Task,
  handleDelete: (id: number) => void,
  handleToggle?: (task: Task) => void,
  checked: number[]
}

export default function SingleTask({ task, handleDelete, handleToggle, checked }: SingleTaskType) {

  const labelId = `checkbox-list-label-${task.id}`;

  return (
    <Paper elevation={0} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "inherit" }}>
      <ListItem
        key={task.id}
        secondaryAction={
          <IconButton onClick={() => handleDelete(task.id)} edge="end" aria-label="comments">
            <Delete color="error" />
          </IconButton>
        }
        disablePadding
      >
        {
          <ListItemButton role={undefined}
            onClick={() => handleToggle && handleToggle(task)} dense>
            {
              handleToggle && 
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(task.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            }

            <ListItemText sx={{ textDecoration: checked.indexOf(task.id) !== -1 ? "line-through" : "none" }} id={labelId} primary={task.title} />
          </ListItemButton>
        }
      </ListItem>
    </Paper>
  );
}
