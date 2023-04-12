import React, { useState } from "react";
import styles from "./TodoApp.module.css";
import { v4 as idv4 } from "uuid";

const EditTask = ({ id, task, onSave }) => {
  const [newTask, setNewTask] = useState(task);

  const handleInputChange = e => {
    setNewTask(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(id, newTask);
  };

  return (
    <div className={styles.EditGroup}>
      <input type="text" value={newTask} onChange={handleInputChange} />
      <button className={styles.btn} onClick={handleSaveClick}>
        save
      </button>
    </div>
  );
};

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = e => {
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (task.length>0) {
      setTasks([...tasks, { task: task, id: idv4() }]);
      setTask("");
    }
  };

  const handleEdit = id => {
    setTasks(
      tasks.map(m => {
        if (m.id === id) {
          return { ...m, isEditing: true };
        }
        return m;
      })
    );
  };

  const handleSave = (id, newTask) => {
    setTasks(
      tasks.map(m => {
        if (m.id === id) {
          return { ...m, task: newTask, isEditing: false };
        }
        return m;
      })
    );
  };

  const handleDelete = id => {
    setTasks(tasks.filter(f => f.id !== id));
  };

  return (
    <>
      <section className={styles.MainCon}>
        <article className={styles.SubCon}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Add List Here"
                value={task}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <button type="submit">add</button>
            </div>
          </form>
          <section className={styles.ListContainer}>
            <article className={styles.ListData}>
              {tasks.map(m => (
                <aside key={m.id}>
                  {m.isEditing ? (
                    <EditTask id={m.id} task={m.task} onSave={handleSave} />
                  ) : (
                    <div>
                      <li>{m.task}</li>
                      <p>
                        <button
                          className={styles.btn}
                          onClick={() => handleEdit(m.id)}
                        >
                          edit
                        </button>
                        <button
                          className={styles.btn}
                          onClick={() => handleDelete(m.id)}
                        >
                          delete
                        </button>
                      </p>
                    </div>
                  )}
                </aside>
              ))}
            </article>
          </section>
        </article>
      </section>
    </>
  );
};

export default TodoApp;
