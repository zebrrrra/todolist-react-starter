import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (value) => setInputValue(value);

  const [todos, setTodos] = useState(dummyTodos);
  const handleAddTodo = () => {
    if (inputValue.length === 0) return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  };
  const handleKeyDown = () => {
    if (inputValue.length === 0) return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  };
  const handleToggleDone = (id) => {
    setTodos((preTodos) => {
      return preTodos.map((preTodo) => {
        if (preTodo.id === id) {
          return {
            ...preTodo,
            isDone: !preTodo.isDone,
          };
        }
        return preTodo;
      });
    });
  };
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((preTodos) => {
      return preTodos.map((preTodo) => {
        if (preTodo.id === id) {
          return {
            ...preTodo,
            isEdit,
          };
        }
        return { ...preTodo, isEdit: false };
      });
    });
  };
  const handleSave = ({ id, title }) => {
    setTodos((preTodos) => {
      return preTodos.map((preTodo) => {
        if (preTodo.id === id) {
          return {
            ...preTodo,
            title,
            isEdit: false,
          };
        }
        return preTodo;
      });
    });
  };
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      TodoPage
      <Header userName="" />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
