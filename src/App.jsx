import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
