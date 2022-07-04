import { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ItemList from "../Item/ItemList"
import { Alert, Collapse, FormControlLabel, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import TaskList from '../Item/TaskList';
import BreadCrumb from '../Layout/BreadCrumb';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { Item, Task } from '../../models/interface';
import { useAppContext } from '../../context/AppContext';
import AlertMessage from '../AlertMessage/AlertMessage';



const ViewItem = ({ item }: { item: Item }) => {

    const {messageAlert, setMessageAlert} = useAppContext();

    const [value, setValue] = useState(item.due_date);
    const [title, setTitle] = useState(item.title || "");
    const [moreTask, setMoreTask] = useState(false);
    const [tasks, setTasks] = useState(item.tasks || []);
    const [task, setTask] = useState("");
    const [status, setStatus] = useState(!item.status ? false : true);
    const [statusMessage, setStatusMessage] = useState(!item.status ? "Unfinished" : "Done");
    const [open, setOpen] = useState(true);


    useEffect(() => {
        setMessageAlert({ status: false, message: "" });
    },[setMessageAlert])

    
    const checkedTasks = (tasks: Task[]): number[] => {
        if (tasks.length > 0) {
            //check for the task completed
            const nList = tasks.filter(x => x.status === 1)

            //return the ids of the tasks
            return [...nList.map(x => x.id)]
        }
        return [0]
    }

    const [checked, setChecked] = useState(checkedTasks(tasks)); //list of the current item ids


    const handleStatus = async () => {
        const newStatus = status ? 0 : 1;
        const x = status ? false : true;
        try {
            setStatus(x);
            setStatusMessage(status ? "Unfinished" : "Done")
            const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/update-status`, { id: item.id, status: newStatus })
            setChecked(checkedTasks(result.data.item.tasks))
        }
        catch (e) {
            //alert(e.message || "Internal system error");
        }


    };

    const handleToggle = async (task: Task) => {
        const currentIndex = checked.indexOf(task.id);
        const newChecked = [...checked];
        let taskStatus = 0;
        if (currentIndex === -1) {
            taskStatus = 1;
            newChecked.push(task.id);

        } else {
            newChecked.splice(currentIndex, 1);
        }

        try {
            setChecked(newChecked);
            task.status = taskStatus;
            const result = await axios.post(process.env.NEXT_PUBLIC_API + `/task/update-status`, { task, itemId: item.id })
            setStatus(!result.data.item.status ? false : true)
            setStatusMessage(!result.data.item.status ? "Unfinished" : "Done")
        }
        catch (e) {
            //alert(e.message || "Internal system error");
        }


    };

    const handleTask = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask(event.target.value);
    };

    const handleTasks = () => {

        if (task) {
            tasks.push({ id: tasks.length + 1, title: task, status: 0 })
            setTasks(tasks)
            setTask("");
        }
    };

    const handleChange = (newValue: string | null) => {
        setValue(newValue);
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleDelete = (id: number) => {
        const newTasks = tasks.filter((task: Task) => task.id !== id)
        setTasks(newTasks)
    }

    const handleSaveItem = async () => {
        const newTasks = {
            title: title,
            due_date: value,
            tasks: tasks,
            id: item.id
        }
        const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/update`, newTasks);
        setMessageAlert({ status: true, message: result.data.message })
        setOpen(true)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BreadCrumb page={"VIEW ITEM"} />
            <AlertMessage />
            <Box sx={{ paddingY: 5 }}>
                <Box sx={{ display: "flex", paddingBottom: 2, gap: 5 }}>
                    <TextField onChange={handleTitle} value={title} id="outlined-basic" sx={{ width: "70%" }} label="Title" variant="outlined" />
                    <DateTimePicker
                        label="Due Date"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField sx={{ opacity: 0.7 }} {...params} />}
                    />
                </Box>

                <FormControlLabel sx={{ padding: 0, margin: 0 }}
                    value="top"
                    control={
                        <Switch color="primary"
                            onChange={handleStatus}
                            checked={status} />
                    }
                    label={<Typography sx={{ opacity: 0.6 }}>{statusMessage}</Typography>}
                    labelPlacement="start"
                />

            </Box>



            <TaskList handleToggle={handleToggle} checked={checked} tasks={tasks} handleDelete={handleDelete} />

            <Box sx={{ display: (moreTask ? "flex" : "none"), paddingBottom: 2, gap: 5 }}>
                <TextField id="outlined-basic" value={task} name="task" onChange={handleTask} sx={{ width: "80%" }} label="Task " variant="outlined" />
                <Button variant="outlined" onClick={handleTasks} sx={{ width: "20%" }} >ADD</Button>
            </Box>
            <Box sx={{ paddingY: 10 }}>
                <Button variant="outlined" color="success" onClick={() => { setMoreTask(!moreTask) }}>{moreTask ? "HIDE MORE TASK" : "ADD MORE TASK"}</Button>
                <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={handleSaveItem} >SAVE</Button>
                <Link href="/">
                    <Button variant="outlined" sx={{ marginLeft: 2 }} onClick ={()=>setMessageAlert({ status: false, message: "" })} color="error">CANCLE</Button>
                </Link>

            </Box>
        </LocalizationProvider>
    )
}

export default ViewItem