import { useState } from 'react'
import './TaskForm.css'

const TaskForm = (props) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState('')

    const onChangeTaskTitle = (event) => {
        setTaskTitle(event.target.value)
        document.querySelector(".alertMsg").classList.add('hide')
    }
    const onChangeTaskDescription = (event) => {
        setTaskDescription(event.target.value)
        document.querySelector(".alertMsg").classList.add('hide')
    }
    const onSubmitTask = (event) => {
        event.preventDefault();
        if(taskTitle.length && taskDescription.length){
            fetch('http://localhost:3000',{
                method: 'post',
                headers: {'ACCEPT': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    taskTitle: taskTitle,
                    taskDescription: taskDescription
                })
            }).then( (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then( async (data) =>{
                setTaskTitle("")
                setTaskDescription('')
                document.querySelector(".taskCreatedMsg").classList.remove('hide')
                setTimeout( () => {
                    document.querySelector(".taskCreatedMsg").classList.add('hide')
                }, 5000)
                props.update()
            }).catch( (error) => {
                console.log(`Form error: ${error}`)
            })
        } else {
            document.querySelector(".alertMsg").classList.remove('hide')
        }
     
    }

    return (
        <div className='formContainer'>
            <form onSubmit={onSubmitTask}>
                <div className='blockInput'>
                    <label htmlFor='inputText'>Title</label>
                    <input type='text' id="inputText" value={taskTitle} onChange={onChangeTaskTitle}/>
                </div>
                <div className='blockInput'>
                    <label htmlFor="inputDescription">Description</label>
                    <input type='text' id="inputDescription" value={taskDescription} onChange={onChangeTaskDescription}/>
                </div>
                <button type='submit'>Save</button>
            </form>
            <div className="hide alertMsg">
                It is necessary to write a title and a description.
            </div>
            <div className="hide taskCreatedMsg">
                Task was created!
            </div>
        </div>
    );
}

export default TaskForm