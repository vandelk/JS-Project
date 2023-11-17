import './App.css';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import NewGarage from './components/NewGarage';
import ViewGarage from './components/ViewGarage';
import NewCar from './components/NewCar';
import ViewCar from './components/ViewCar';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/new-garage" element={<NewGarage/>}/>
        <Route path="/garage/:garageId" element={<ViewGarage/>}/>
        <Route path="/:garageId/new-car" element={<NewCar/>}/>
        <Route path="/:garageId/:carId" element={<ViewCar/>} />
      </Routes>
    </div>
  );
}

export default App;
