import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTodos = Array.from(todos);
    const updatedCompletedTodos = Array.from(completedTodos);

    const removedTodo = source.droppableId === "TodosList" ? updatedTodos.splice(source.index, 1)[0] : updatedCompletedTodos.splice(source.index, 1)[0];

    if (destination.droppableId === "TodosList") {
      updatedTodos.splice(destination.index, 0, removedTodo);
    } else {
      updatedCompletedTodos.splice(destination.index, 0, removedTodo);
    }

    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
