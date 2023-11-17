import './App.css';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
