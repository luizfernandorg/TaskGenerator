import React from 'react'
import TaskItem from './TaskItem'
import './TaskList.css'

const TaskList = (props) => {
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
                        return <TaskItem key={task.taskID} update={props.update} task={task}/>
                    })
                }
            </>
        )

    }
}
export default TaskList