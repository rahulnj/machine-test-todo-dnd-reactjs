import React, { useEffect, useState } from 'react'
import './_DragAndDrop.scss'
import { Droppable } from 'react-beautiful-dnd'
import SingleTask from '../SingleTask/SingleTask'
import axios from 'axios'

const DragAndDrop = () => {
    const [tasks, setTasks] = useState([{}])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/')
                console.log(data);
                setTasks(data.slice(0, 20))
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    return (
        <Droppable droppableId='todolist-active'>
            {
                (provided) => (
                    <div className='tasklist'
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
    )
}

export default DragAndDrop