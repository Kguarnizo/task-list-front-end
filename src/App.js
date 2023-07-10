/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskButton from './components/TaskButton';
import axios from 'axios';

const kBaseUrl = 'http://127.0.0.1:5000';

const convertFromApi = (apiTask) => {
  const { id, title, description, is_complete } = apiTask;
  const newTask = { id, title, description, isComplete: is_complete };
  return newTask;
};

const getAllTasks = () => {
  return axios
  .get(`${kBaseUrl}/tasks`)
  .then((response) => {
    return response.data.map(convertFromApi);
  })
  .catch((error) => {
    console.log(error);
  });
};

const updateTask =(id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
  return axios
  .patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
  .then(response => {
    console.log(convertFromApi(response.data.task));
    return convertFromApi(response.data.task);
  })
  .catch((error) => {
    console.log(error);
  });
};

const deleteTask = (id) => {
  return axios
  .delete(`${kBaseUrl}/tasks/${id}`)
  .catch((error) => {
    console.log(error);
  });
};

const App = () => {
  const [taskData, setTaskData]= useState([]);

  const onComplete = (id) => {
    updateTask(id).then((updatedTask) => {
      setTaskData((oldData) => {
        return oldData.map((task) => {
          if (task.id === id) {
            return updatedTask;
          }
          return task;
        });
      });
    });
  };

  const onUnregister = (id) => {
    deleteTask(id).then(() => {
      setTaskData((oldData) => {
        return oldData.filter((task) => task.id !== id);
      });
    });
  };

  const fetchTasks = () => {
    return getAllTasks()
    .then((tasks) => {
      setTaskData(tasks);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onHandleSubmit = (data) => {
    axios
      .post(`${kBaseUrl}/tasks`, data)
      .then ((response) => {
        setTaskData((oldData) => [...oldData, convertFromApi(response.data.task)]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={taskData} onComplete = {onComplete} onUnregister={onUnregister}/></div>
        <div><NewTaskForm onHandleSubmit={onHandleSubmit}></NewTaskForm></div>
      </main>
    </div>
  );
};

export default App;
