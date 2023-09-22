import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const kNewFormData = {
    title: '',
    isComplete: false,
};

const NewTaskForm = (props) => {
    const [taskData, setTaskData] = useState(kNewFormData);

    const onTaskChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTaskData((oldtaskData) => ({ ...oldtaskData, [name]:value }));

        console.log('taskData.isComplete:', taskData.isComplete);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isComplete = taskData.isComplete === 'true';

        console.log('isComplete:', isComplete);

        const newTask = {
            title: taskData.title,
            description: '',
            isComplete: taskData.isComplete,
        };

        props.onHandleSubmit(newTask);
        setTaskData(kNewFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Add a Task</h1>
                <label htmlFor="name">Title</label>
                <input 
                    type="text" 
                    id="name" 
                    name="title" 
                    onChange={onTaskChange} 
                    value={taskData.title}>
                </input>
                <label htmlFor="complete">Complete</label>
                <select 
                    id="complete"
                    name="isComplete" 
                    onChange={onTaskChange}
                    value={taskData.isComplete}
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                <div>
                    <input type="submit" id="button" value="Add Task"></input>
                </div>
            </div>
        </form>
    );
};


NewTaskForm.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;