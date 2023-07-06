import React, { useState } from 'react'
import TaskItem from './TaskItem'
import './TaskList.css'

const TaskList = (props) => {
    const [editTask, setEditTask] = useState({})

    const showModal = (task) => {
        setEditTask((prev) => {
            return {...task}
        })
        new bootstrap.Modal('#staticBackdrop').show()
    }
    
    const onChangeTitle = (event) => {
        const taskTitle = event.target.value 
        setEditTask( (prev) => {
            return {...prev,taskTitle}
        })
    }

    const onChangeDescription = (event) => {
        const taskDescription = event.target.value
        setEditTask( (prev) => {
            return {...prev,taskDescription}
        })
    }
    const saveTask = () => {
        fetch('http://localhost:3000',{
            method: 'put',
            headers: {'ACCEPT': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                taskID: parseInt(editTask.taskID),
                taskTitle: editTask.taskTitle,
                taskDescription: editTask.taskDescription
            })
        }).then( async (response) => {
            return await response.json()
        }).then( async (data) => {
            console.log(data)
            await props.update()
            // setEdit(false)
            new bootstrap.Modal('#staticBackdrop').hide()
            setEditTask({})
        }).catch( err => {
            console.log(err)
        })
    }

    if(props.tasks.length === 0){
        return (
            <span>
                No task created...
            </span>
        )
    }else {
        return (
            <>
                {
                    props.tasks.map( (task) => {
                        return <TaskItem key={task.taskID} update={props.update} task={task} onShowModal={showModal}/>
                    })
                }
                
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className='blockEditInput'>
                        <label htmlFor='inputText'>Title</label>
                        <input type='text' id="inputText" value={editTask.taskTitle} onChange={onChangeTitle}/>
                    </div>
                    <div className='blockEditInput'>
                        <label htmlFor="inputDescription">Description</label>
                        <input type='text' id="inputDescription" value={editTask.taskDescription} onChange={onChangeDescription}/>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveTask}>Save</button>
                    </div>
                    </div>
                </div>
                </div>

           </>
        )

    }
}
export default TaskList