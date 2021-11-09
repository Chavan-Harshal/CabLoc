import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CustomerLogin from "./pages/CustomerLogin";
import DriverLogin from "./pages/DriverLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerPage from "./pages/CustomerPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import DriverPage from "./pages/DriverPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/CustomerLogin" component={CustomerLogin} />
        <Route exact path="/DriverLogin" component={DriverLogin} />
        <Route exact path="/CustomerPage" component={CustomerPage} />
        <Route exact path="/AdminLogin" component={AdminLogin} />
        <Route exact path="/AdminPage" component={AdminPage} />
        <Route exact path="/DriverPage" component={DriverPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
