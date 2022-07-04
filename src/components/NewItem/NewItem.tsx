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
import { Task } from '../../models/interface';
import AlertMessage from '../AlertMessage/AlertMessage';
import { useAppContext } from '../../context/AppContext';


const NewItem = () => {
    const router = useRouter()

    const { setMessageAlert, setOpen } = useAppContext()

    const [value, setValue] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState("");
    const [title, setTitle] = useState("");
    const [allow, setAllow] = useState(false); //for enabling the save button

    const API = process.env.NEXT_PUBLIC_API;


    const handleAllow = () => {
        if (title && tasks.length > 0) {
            setAllow(true)
        }
        else {
            setAllow(false)
        }
    }

    

    useEffect(() => {
        setMessageAlert({ status: false, message: "" });
    },[setMessageAlert])
    

    useEffect(() => {
        handleAllow()
    })

    async function handleSaveItem() {

        const newData = {
            title: title,
            due_date: value,
            tasks: tasks
        }

        try {
            const result = await axios.post(API + `/item/create`, newData)
            setMessageAlert({ status: true, message: result.data.message });
            setOpen(true);
            setTasks([])
            setValue(null)
            setTask("")
            router.push("/")
        }
        catch (e) {
            //alert(e.message || "Internal system error");
        }

    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value);
        handleAllow();
    };

    const handleChange = (newValue: string | null) => {
        setValue(newValue);
    };

    const handleTask = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask(event.target.value);
    };

    const handleTasks = () => {
        if (task) {
            const nTask = { status: 0, id: 0, title: "" };
            nTask.id = tasks.length ? Math.max(...tasks.map(x => x.id)) + 1 : 1;
            nTask.title = task;

            tasks.push(nTask)
            setTasks(tasks)
            setTask("");
        }
    };

    const handleDelete = (id: number): void => {
        const newTasks = tasks.filter((task: Task) => task.id != id)
        setTasks(newTasks)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" >
                <BreadCrumb page="NEW ITEM" />
                <AlertMessage />
                <Box>
                    <Box sx={{ display: "flex", paddingY: 5, gap: 5 }}>

                        <TextField name="title" value={title} onChange={handleTitle} id="outlined-basic" sx={{ width: "70%" }} label="Title" variant="outlined" />
                        <DateTimePicker
                            // sx={{ width: "30%" }}
                            label="Due Date"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField sx={{ opacity: 0.7 }} {...params} />}
                        />
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: 5, gap: 5 }}>
                        <TextField value={task} name="task" onChange={handleTask} id="outlined-basic" sx={{ width: "80%" }} label="Task" variant="outlined" />
                        <Button variant="outlined" onClick={handleTasks} sx={{ width: "20%" }} >ADD</Button>
                    </Box>
                </Box>
                <TaskList tasks={tasks} handleDelete={handleDelete} />
                <Box sx={{ paddingY: 10 }}>
                    <Button onClick={handleSaveItem} variant="outlined" disabled={!allow} >
                        SAVE
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default NewItem