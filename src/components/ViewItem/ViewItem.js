import { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ItemList from "../Item/ItemList"
import { FormControlLabel, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import TaskList from '../Item/TaskList';
import BreadCrumb from '../Layout/BreadCrumb';
import Switch from '@mui/material/Switch';
import axios from 'axios';



const ViewItem = ({ item }) => {
    const [value, setValue] = useState(item.due_date);
    const [title, setTitle] = useState(item.title || "");
    const [moreTask, setMoreTask] = useState(false);
    const [tasks, setTasks] = useState(item.tasks || []);
    const [task, setTask] = useState("");
    const [status, setStatus] = useState(!item.status ? false : true);
    const [statusMessage, setStatusMessage] = useState(!item.status ? "Unfinished" : "Done");

    const checkedItems = (lists) => {
        if (lists.length > 0) {
            //check for the task completed
            const nList = lists.filter(x => parseInt(x.status) === 1)

            //return the ids of the tasks
            return [...nList.map(x => parseInt(x.id))]
        }
        return [0]
    }

    const [checked, setChecked] = useState(checkedItems(tasks)); //list of the current item ids


    const handleStatus = async () => {
        const newStatus = status ? 0 : 1;
        const x = status ? false : true;
        try {
            setStatus(x);
            setStatusMessage(status ? "Unfinished" : "Done")
            const result = await axios.post(process.env.NEXT_PUBLIC_API + `/item/update-status`, { id: item.id, status: newStatus })
            setChecked(checkedItems(result.data.item.tasks))
        }
        catch (e) {
            alert(e.message || "Internal system error");
        }


    };

    const handleToggle = (task) => async () => {
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
            alert(e.message || "Internal system error");
        }


    };

    const handleTask = (event) => {
        setTask(event.target.value);
    };

    const handleTasks = () => {

        if (task) {
            tasks.push({id: tasks.length+1,  title: task, status: 0})
            setTasks(tasks)
            setTask("");
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleDelete = (id) => {
        const newTasks = tasks.filter((val, index) => index != id)
        setTasks(newTasks)
    }

    const handleSaveItem = async () => {
        const newTasks = {
            title: title,
            due_date: value,
            tasks: tasks,
            id: item.id
        }
        const result = await axios.post(process.env.NEXT_PUBLIC_API +`/item/update`, newTasks);
        alert(result.data.message)

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BreadCrumb page={"VIEW ITEM"} />
            <Box sx={{ paddingY: 5 }}>
                <Box sx={{ display: "flex", paddingBottom: 2, gap: 5 }}>
                    <TextField onChange={handleTitle} value={title} id="outlined-basic" sx={{ width: "70%" }} label="Title" variant="outlined" />
                    <DateTimePicker sx={{ width: "30%" }}
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

            <TaskList handleToggle={handleToggle} checked={checked} tasks={tasks} handleDelete={handleDelete} checkbox={true} />

            <Box sx={{ display: (moreTask ? "flex" : "none"), paddingBottom: 2, gap: 5 }}>
                <TextField id="outlined-basic" value={task} name="task" onChange={handleTask} sx={{ width: "80%" }} label="Task " variant="outlined" />
                <Button variant="outlined" onClick={handleTasks} sx={{ width: "20%" }} >ADD</Button>
            </Box>
            <Box sx={{ paddingY: 10 }}>
                <Button variant="outlined" color="success" onClick={() => { setMoreTask(!moreTask) }}>{moreTask ? "HIDE MORE TASK" : "ADD MORE TASK"}</Button>
                <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={handleSaveItem} >SAVE</Button>
                <Link href="/">
                    <Button variant="outlined" sx={{ marginLeft: 2 }} color="error">CANCLE</Button>
                </Link>

            </Box>
        </LocalizationProvider>
    )
}

export default ViewItem