import './App.css';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import NewGarage from './components/NewGarage';
import ViewGarage from './components/ViewGarage';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/new-garage" element={<NewGarage/>}/>
        <Route path="/garage/:garageName" element={<ViewGarage/>}/>
      </Routes>
    </div>
  );
}

export default App;
