import { useState } from 'react'
import './App.css'

function ToDoApp() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!task) {
            alert('Please enter your task')
        } else if(task && edit) {
            setTasks(tasks.map((item) => item.id === id ? {...item, task} : item))
            setEdit(false)
            setTask('')
            setId(0)
        } else {
            const newTask = {id: new Date().getTime().toString(), task}
            setTasks([...tasks, newTask])
            setTask('')
        }
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter((item) => item.id !== id))

    }

    const handleEdit = (id) => {
        const specificTask = tasks.find((item) => item.id === id)
        setEdit(true)
        setTask(specificTask.task)
        setId(id)
    }

    const handleClear = () => {
        setTasks([])
    }


  //   sorting function if checkbox is checked
      const handleSort = () => {
        let tasks = document.querySelectorAll('input[type="checkbox"]');
        let tasksArray = Array.from(tasks);
        let checkedTasks = tasksArray.filter(task => task.checked);
        let uncheckedTasks = tasksArray.filter(task => !task.checked);
        let sortedTasks = uncheckedTasks.concat(checkedTasks);
        sortedTasks.forEach(task => task.parentElement.parentElement.appendChild(task.parentElement));

    }





  return (
    <div className="container text-center
    border font-bold text-lg">
        <h1>ToDo App</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter tasks..." className="border p-2 m-2 rounded"   />
            <button type="submit" className="my-1 mx-2 text-white bg-lime-800 hover:bg-lime-600 rounded py-2 px-4">{edit ? 'Edit' : 'Add'}</button>
        </form>
        <div className="list">
            {tasks.map((item) => {
                const {id, task} = item;
                return (
                    <>
                    <div className="task" key={id}>
                        <input type="checkbox" className="p-5" />
                        <p>{task}</p>
                        <div className="btns">
                            <button className="bg-yellow-700 hover:bg-yellow-500" onClick={() => handleEdit(id)}>Edit</button>
                            <button className="bg-red-800 hover:bg-red-600" onClick={() => handleDelete(id)}>Delete</button>
                        </div>

                    </div>

                    </>
                )

            }
            )}

        </div>
        <button onClick={handleClear} className="my-1 mx-2 text-white bg-gray-900 hover:bg-gray-700 rounded py-2 px-4">Clear list</button>
        <button onClick={handleSort} className="my-1 mx-2 text-white bg-gray-900 hover:bg-gray-700 rounded py-2 px-4">Sort</button>
    </div>
  )
}

export default ToDoApp;
