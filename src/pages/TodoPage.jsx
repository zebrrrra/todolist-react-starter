import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (value) => setInputValue(value);

  const [todos, setTodos] = useState([]);
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();

  const handleAddTodo = async () => {
    if (inputValue.length === 0) return;
    try {
      const data = await createTodo({ title: inputValue, isDone: false });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = async () => {
    if (inputValue.length === 0) return;
    try {
      const data = await createTodo({ title: inputValue, isDone: false });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDone = async (id) => {
    // currentTodo取得當前修改的todo
    const currentTodo = todos.find((todo) => todo.id === id);

    try {
      await patchTodo({ id, isDone: !currentTodo.isDone });
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
    } catch (error) {
      console.error(error);
    }
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
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title });
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
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async ({ id }) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  // 請求todo資料
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  // 驗證authToken
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
  return (
    <div>
      TodoPage
      <Header userName={currentMember?.name} />
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
