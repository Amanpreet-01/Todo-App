import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState(""); // Input text
  const [todos, setTodos] = useState([]); // Array which holds todos
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage when component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let storedTodos = JSON.parse(todoString);
        if (Array.isArray(storedTodos)) {
          setTodos(storedTodos);
        } else {
          console.error("Invalid todos format in localStorage");
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
      }
    }
  }, []);
  
  

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    if (todos.length > 0) { // Only save if there are todos
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleFinish = ()=>{
    setShowFinished(!showFinished) 
  }
  

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    if (t) setTodo(t.todo);

    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    // Update localStorage immediately after state update
  localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleAdd = () => {
    if (!todo.trim()) return; // Prevent empty todos
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="addTodo">
          <h2>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd} >Save</button>
        </div>
      <input onChange={toggleFinish} type="checkbox" checked={showFinished}  /> Show Finished
        <h2>Your TODOS</h2>
        <div className="todos">
          {todos.length === 0 && <div>NO TODOS TO DISPLAY</div>}

          {todos
  .filter(item => showFinished || !item.isCompleted)
  .map(item => (
    <div key={item.id} className="todo">
      <input
        onChange={handleCheckbox}
        type="checkbox"
        checked={item.isCompleted}
        name={item.id}
      />
      <div className="text">{item.todo}</div>
      <div className="buttons">
        <button onClick={(e) => handleEdit(e, item.id)}>Edit</button>
        <button onClick={(e) => handleDelete(e, item.id)}>Delete</button>
      </div>
    </div>
  ))}

        </div>
      </div>
    </>
  );
}

export default App;
