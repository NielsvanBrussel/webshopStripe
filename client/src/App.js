import './App.css';
import Login from './components/Login'
import CheckOut from './components/CheckOut'
import Home from './components/Home'
import DashBoard from './components/Dashboard'
import Registration from './components/Registration'
import { GlobalProvider } from "./context/GlobalState"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ProductList from './components/products/ProductList';

function App() {
  return (
    <GlobalProvider>
      <DashBoard />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/registration">Register</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/shop">
              <ProductList />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/checkout">
              <CheckOut />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>           
    </GlobalProvider>
);}

export default App;
