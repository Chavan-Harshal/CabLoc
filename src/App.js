import { BrowserRouter, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import CustomerLogin from './pages/CustomerLogin';
import DriverLogin  from './pages/DriverLogin';
import CustomerPage from './pages/CustomerPage';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Route exact path = '/' component = {HomePage} />
        <Route exact path = '/CustomerLogin' component = {CustomerLogin} />
        <Route exact path = '/DriverLogin' component = {DriverLogin} />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
