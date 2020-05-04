import React, {Component} from "react";
import './App.css';
import TodoList from './Components/TodoList';

// export default TodoList;


function App() {
  let sana = 'Kissa'
  return (
    <div className="App">
      <header className="App-header">
          Testitekstiä tralala<br />
          Jee <br />
          <TodoList />
      </header>
    </div>
  );
}

export default App;
