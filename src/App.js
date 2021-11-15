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
import UserLocation from "./components/Usertrip";
import temp from "./pages/temp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/CustomerLogin" component={CustomerLogin} />
        <Route exact path="/DriverLogin" component={DriverLogin} />
        <ProtectedRoute
          allowedRoles={["customer"]}
          exact
          path="/CustomerPage"
          component={CustomerPage}
        />
        <Route exact path="/AdminLogin" component={AdminLogin} />
        <ProtectedRoute
          allowedRoles={["admin"]}
          exact
          path="/AdminPage"
          component={AdminPage}
        />
        <ProtectedRoute
          allowedRoles={["driver"]}
          exact
          path="/DriverPage"
          component={DriverPage}
        />
        <ProtectedRoute
          allowedRoles={["customer"]}
          exact
          path="/UserTrip"
          component={UserLocation}
        />
        <Route exace path="/temp" component={temp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
