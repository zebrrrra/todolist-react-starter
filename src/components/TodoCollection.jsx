import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onSave,
  onDelete,
  onToggleDone,
  onChangeMode,
}) => {
  return (
    <div>
      TodoCollection
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggleDone={(id) => onToggleDone(id)}
            onChangeMode={({ id, isEdit }) => onChangeMode({ id, isEdit })}
            onSave={({ id, title }) => onSave({ id, title })}
            onDelete={({ id }) => onDelete({ id })}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
