import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './_DragAndDrop.scss'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import SingleTask from '../SingleTask/SingleTask'




const DragAndDrop = () => {

    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(false)
    const inputRef = useRef()
    const [inputTask, setInputTask] = useState({ completed: false, id: '', title: '' })

    useEffect(() => {
        inputRef.current.focus()
    }, [])


    useEffect(() => {
        if (localStorage.getItem("taskList")) {
            setTasks(JSON.parse(localStorage.getItem("taskList")))
        } else {
            const fetchData = async () => {
                try {
                    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/')
                    setTasks(data.slice(0, 20))
                    localStorage.setItem('taskList', JSON.stringify(data.slice(0, 20)))
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
    }, [])

    const addTaskHandler = () => {
        if (inputTask.title === '') {
            setError(true)
            inputRef.current.focus()
        } else {
            setError(false)
            setTasks([inputTask, ...tasks])
            localStorage.setItem('taskList', JSON.stringify([inputTask, ...tasks]))
            setInputTask({ completed: false, id: '', title: '' })
        }
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (destination.index === source.index) return;

        let add;
        let updatedTaskList = tasks
        if (destination.droppableId === source.droppableId) {
            add = updatedTaskList[source.index]
            updatedTaskList.splice(source.index, 1)
            updatedTaskList.splice(destination.index, 0, add)
        }
        setTasks(updatedTaskList)
        localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='tasklist'>
                <div className='tasklist_actions'>
                    <input className={error ? 'tasklist_actions_inputerror' : 'tasklist_actions_input'}
                        type="text" placeholder={error ? 'Please add a task' : 'Add Task'}
                        value={inputTask.title}
                        ref={inputRef}
                        onKeyPress={(e) => { e.key === "Enter" && addTaskHandler() }}
                        onChange={(e) => setInputTask({ ...inputTask, id: new Date().getTime(), title: e.target.value })}
                    />
                    <button className='tasklist_actions_successbtn'
                        onClick={addTaskHandler}
                    >Add</button>
                </div>
                <Droppable droppableId='tasklist-active'>
                    {
                        (provided) => (
                            <div className='tasklist_wrapper'
                                ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    tasks?.map((task, index) => (
                                        <SingleTask
                                            id={task?.id}
                                            index={index}
                                            title={task?.title}
                                        />
                                    ))
                                }
                                {provided.placeholder}
                            </div >
                        )
                    }
                </Droppable >
            </div>
        </DragDropContext >
    )
}

export default DragAndDrop