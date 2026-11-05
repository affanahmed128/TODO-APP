import logo from './logo.svg';
import './styles.css';
import TodoList from './components/TodoList';

// App is the root component that loads the todo application UI.
function App() {
  return (
    <div className="App">
      {/* TodoList handles fetching, creating, and deleting todo items. */}
      <TodoList></TodoList>
    </div>
  );
}

export default App;
