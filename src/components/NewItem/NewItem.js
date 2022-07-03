import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import BreadCrumb from '../Layout/BreadCrumb';
import TaskList from '../Item/TaskList';
import axios from 'axios';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';


const NewItem = () => {
    const router = useRouter()

    const [value, setValue] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [title, setTitle] = useState("");
    const [allow, setAllow] = useState(false);

    const API = process.env.NEXT_PUBLIC_API;


    const { register, handleSubmit, reset, formState } = useForm();

    const handleAllow = () =>{
        if(title && tasks.length > 0){
            setAllow(true)
        }
        else{
            setAllow(false)
        }
    }

    useEffect(()=>{
        handleAllow()
    })

    async function handleSaveItem() {

        const newData = {
            title: title,
            due_date: value,
            tasks: tasks
        }

        try{
            const result = await axios.post(API+`/item/create`, newData)
            alert(result.data.message);
            router.push("/")
        }
        catch(e){
            alert(e.message || "Internal system error");
        }
        
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
        handleAllow();
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleTask = (event) => {
        setTask(event.target.value);
    };

    const handleTasks = () => {

        if (task) {
            tasks.push(task)
            setTasks(tasks)
            setTask("");
        }
    };

    const handleDelete = (id) => {
        const newTasks = tasks.filter((val, index) => index != id)
        setTasks(newTasks)
    }

    const handleToggle = ()=>{return null}


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" >
                <BreadCrumb page="NEW ITEM" />
                <Box>
                    <Box sx={{ display: "flex", paddingY: 5, gap: 5 }}>
                         
                        <TextField name="title" value={title}  onChange={handleTitle}  id="outlined-basic" sx={{ width: "70%" }} label="Title" variant="outlined" />
                        <DateTimePicker sx={{ width: "30%" }}
                            label="Due Date"
                            name="due_date"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField sx={{ opacity: 0.7 }} {...params} />}
                        />
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: 5, gap: 5 }}>
                        <TextField value={task}  name="task" onChange={handleTask} id="outlined-basic" sx={{ width: "80%" }} label="Task" variant="outlined" />
                        <Button variant="outlined" onClick={handleTasks} sx={{ width: "20%" }} >ADD</Button>
                    </Box>
                </Box>
                <TaskList checkbox={false} tasks={tasks} handleDelete={handleDelete} handleToggle={handleToggle} />
                <Box sx={{ paddingY: 10 }}>
                    <Button onClick={handleSaveItem} variant="outlined" disabled={!allow} >
                        {formState.isSubmitting && "Loading..."}
                        SAVE
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default NewItem