import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (task) {
      const newTask = {
        text: task,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setPendingTasks([...pendingTasks, newTask]);
      setTask('');
    }
  };

  const removeTask = (index, isCompleted = false) => {
    if (isCompleted) {
      const newCompletedTasks = completedTasks.filter((_, i) => i !== index);
      setCompletedTasks(newCompletedTasks);
    } else {
      const newPendingTasks = pendingTasks.filter((_, i) => i !== index);
      setPendingTasks(newPendingTasks);
    }
  };

  const completeTask = (index) => {
    const completedTask = pendingTasks[index];
    setCompletedTasks([...completedTasks, completedTask]);
    removeTask(index);
  };

  const reopenTask = (index) => {
    const reopenedTask = completedTasks[index];
    setPendingTasks([...pendingTasks, reopenedTask]);
    removeTask(index, true);
  };

  const startEditing = (index, isCompleted = false) => {
    setIsEditing({ index, isCompleted });
    const taskList = isCompleted ? completedTasks : pendingTasks;
    setEditText(taskList[index].text);
  };

  const editTask = () => {
    const { index, isCompleted } = isEditing;
    if (isCompleted) {
      const updatedTasks = completedTasks.map((task, i) =>
        i === index ? { ...task, text: editText } : task
      );
      setCompletedTasks(updatedTasks);
    } else {
      const updatedTasks = pendingTasks.map((task, i) =>
        i === index ? { ...task, text: editText } : task
      );
      setPendingTasks(updatedTasks);
    }
    setIsEditing(null);
    setEditText('');
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <h2>Tarefas Pendentes</h2>
      <ul className="task-list">
        {pendingTasks.map((task, index) => (
          <li key={index} className="task-item">
            {isEditing && isEditing.index === index && !isEditing.isCompleted ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={editTask}>Salvar</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <span className="task-time">{task.time}</span>
                <button onClick={() => completeTask(index)}>Concluir</button>
                <button onClick={() => startEditing(index)}>Editar</button>
                <button onClick={() => removeTask(index)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Tarefas Concluídas</h2>
      <ul className="task-list">
        {completedTasks.map((task, index) => (
          <li key={index} className="task-item">
            {isEditing && isEditing.index === index && isEditing.isCompleted ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={editTask}>Salvar</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <span className="task-time">{task.time}</span>
                <button onClick={() => reopenTask(index)}>Reabrir</button>
                <button onClick={() => startEditing(index, true)}>Editar</button>
                <button onClick={() => removeTask(index, true)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;