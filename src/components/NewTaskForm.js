import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
    const [newTitle, setNewTitle] = useState('');

    const onTaskChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            title: newTitle,
            description: '',
        };

        props.onHandleSubmit(newTask);
        setNewTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Add a Task</h1>
                <label htmlFor="name">Title</label>
                <input type="text" id="name" name="name" onChange={onTaskChange} value={newTitle}></input>
                <label htmlFor="complete">isComplete</label>
                <select id="complete">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
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