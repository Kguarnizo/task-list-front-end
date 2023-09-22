import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : 'tasks__item__toggle';
  return (
    <li className="tasks__item">
      <button onClick={()=> props.onComplete(props.id)} 
      className={`tasks__item__toggle ${buttonClass}`}>{props.title}</button>
      <button onClick={() => props.onUnregister(props.id)}
      className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired
};

export default Task;