import React, { useEffect, useState } from 'react'
import './TaskItem.css'

const TaskItem = (props) => {
    const [taskTitle, setTaskTitle] = useState(props.task.taskTitle)
    const [taskDescription, setTaskDescription] = useState(props.task.taskDescription)

    const [edit, setEdit] = useState(false)

    const onEdit = () => {
        setEdit(true)
    }
    
    const onRemove = () => {
        fetch('http://localhost:3000',{
            method: 'delete',
            headers: {'ACCEPT': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
              taskID: props.task.taskID,
            })
        }).then( async (response) => {
            return await response.json()
        }).then( async (data) => {
            await props.update()
         }).catch( err => {
            console.log(err)
         })
    }

    const onChangeTitle = (event) => {
        setTaskTitle(event.target.value)
    }

    const onChangeDescription = (event) => {
        setTaskDescription(event.target.value)
    }
    
    const onSubmitTask = (event) => {
        event.preventDefault()
        console.log(parseInt(props.task.taskID))
        fetch('http://localhost:3000',{
            method: 'put',
            headers: {'ACCEPT': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                taskID: parseInt(props.task.taskID),
                taskTitle: taskTitle,
                taskDescription: taskDescription
            })
        }).then( async (response) => {
            return await response.json()
        }).then( async (data) => {
            await props.update()
            setEdit(false)
        }).catch( err => {
            console.log(err)
        })
        
    }

    if(edit) {
        return (
            <div key={props.task.taskID} className='editForm'>
                <form onSubmit={onSubmitTask}>
                    <div className='blockEditInput'>
                        <label htmlFor='inputText'>Title</label>
                        <input type='text' id="inputText" value={taskTitle} onChange={onChangeTitle}/>
                    </div>
                    <div className='blockEditInput'>
                        <label htmlFor="inputDescription">Description</label>
                        <input type='text' id="inputDescription" value={taskDescription} onChange={onChangeDescription}/>
                    </div>
                    <button className='submitButton' type='submit'>Salvar</button>
                </form> 
            </div>
        )
    } else {
        return (
            <div key={props.task.taskID} className='itemContainer'>
                <h1>{props.task.taskTitle}</h1>
                <div>
                    {props.task.taskDescription}
                </div>
                <div className='button-block'>
                    <button className='myBtn itemEdit-Button' onClick={onEdit}>Edit</button>
                    <button className="myBtn itemRemove-Button" onClick={onRemove}>Remove</button>
                </div>
            </div>
        )
    }
}

export default TaskItem