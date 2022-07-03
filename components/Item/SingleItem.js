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

export default function SingleItem({ item: value, handleDelete, checked, handleToggle }) {
  //const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  const labelId = `checkbox-list-label-${value}`;

  return (
    <Paper elevation={0} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "inherit" }}>
      <ListItem
        key={value}
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="comments">
              <Link href={"/item/"+value.id}>
                <CommentIcon color="primary"  />
              </Link>
            </IconButton>
            <IconButton onClick={()=> {handleDelete(value.id)}} edge="end" aria-label="comments">
              <Delete color="error"  />
            </IconButton>
          </>
        }
        disablePadding
      >
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
          <ListItemText id={labelId} sx={{textDecoration: checked.indexOf(value.id) !== -1 ? "line-through":"none"}} primary={value.title} secondary={<Typography sx={{ opacity: 0.5 }} component="h1" variant="caption">{value.created_at}</Typography>} />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
