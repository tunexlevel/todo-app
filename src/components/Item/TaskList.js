import List from '@mui/material/List';
import SingleTask from './SingleTask';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

export default function TaskList({ checkbox, tasks, handleDelete, handleToggle, checked }) {
    
    return (
        <Box>
            <Typography component="h1" variant="caption">
                Task List
            </Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    tasks.map((value, index) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <SingleTask
                                handleToggle={handleToggle}
                                checked={checked}
                                handleDelete={handleDelete}
                                id={index}
                                checkbox={checkbox}
                                item={value} 
                                key={index} />
                        );
                    })
                }
                {!tasks.length && <SingleTask deleteBtn={true} item={"No task added yet..."} />}
            </List>
        </Box>
    );
}
