
import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
 
import Navbar from './components/Navbar'

function App() {
  const [ todo, setTodo] = useState("") //input text
  const [ todos, setTodos] = useState([]) //array which holds our todos

  const handleEdit = () => {

  }

  const handleDelete = () => {
    
  }
 
  const handleAdd = () => {
   
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]); 
    setTodo('');
     
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox  = (e) => { 
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos;
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);
   }

  return (
    <>
    <Navbar />
      <div className="container">
        <div className="addTodo">
          <h2>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd}>Add</button>
        </div>

       <h2>Your TODOS</h2>
       <div className="todos">
        {
          todos.map(item=>{
        
         return <div key={item.id} className="todo">
          <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} />
          <div className="text">{item.todo}</div>
          <div className="buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>

        </div>
        })}
       </div>

      </div>
    </>
  )
}

export default App
