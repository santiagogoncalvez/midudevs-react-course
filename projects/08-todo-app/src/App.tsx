import Todos from './components/Todos';
import Footer from './components/Footer';
import Header from './components/Header';
import { useFilters } from './hooks/useFilters';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    handleAddTodo,
    handleRemove,
    handleCompleted,
    handleRemoveAllCompleted,
    handleModifyTodo,
    activeCount,
    completedCount,
  } = useTodos();
  const { filterSelected, handleFilterChange, filteredTodos } = useFilters({
    todos,
  });

  

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />

      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleCompleted}
        onModifyTodo={handleModifyTodo}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default App;
