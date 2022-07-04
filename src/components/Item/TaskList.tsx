import List from '@mui/material/List';
import SingleTask from './SingleTask';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';


import { Task } from '../../models/interface';
import { Paper } from '@mui/material';


export interface TaskListType {
    tasks: Task[],
    handleDelete: (id: number) => void,
    handleToggle?: (task: Task) => void,
    checked?: number[]
}


export default function TaskList({tasks, handleDelete, handleToggle, checked }: TaskListType) {

    return (
        <Box>
            <Typography component="h1" variant="caption">
                Task List
            </Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    tasks.map((task, index) => {
                        return (
                            <SingleTask
                                handleToggle={handleToggle}
                                checked={checked || [0]}
                                handleDelete={handleDelete}
                                task={task}
                                key={index} />
                        );
                    })
                }
                { !tasks.length && <Box><Paper>No task added yet...</Paper></Box> }
            </List>
        </Box>
    );
}
