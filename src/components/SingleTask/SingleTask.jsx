import React from 'react'
import './_SingleTask.scss'
import { Draggable } from 'react-beautiful-dnd'

const SingleTask = ({ id, title, index }) => {

    return (
        <div key={id}>
            <Draggable draggableId={id?.toString()} index={index}>
                {
                    (provided) => (
                        <div className='singletask'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <p>
                                {title}
                            </p>
                        </div>
                    )
                }
            </Draggable>
        </div>
    )
}

export default SingleTask