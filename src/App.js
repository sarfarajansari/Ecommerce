import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {BrowserRouter as Router, Switch ,Route} from "react-router-dom";
import store from "./pages/store";
import Product from "./pages/product";
import order from "./pages/order";
import Page from "./pages/page";

function App() {
  return (

      <Router>
        <Switch>
          <Route path="/" exact component={store} />
          <Route path="/product/:id" exact component={Product} />
          <Route path="/order/:id" exact component={order} />
          <Route path="/cart/" exact component={Page} />
          <Route path="/checkout/" exact component={Page} />
          <Route path="/orders/history" exact component={Page} />
          <Route path="/login" exact component={Page} />
          <Route path="/register" exact component={Page} />
          <Route path="/about" exact component={Page} />
        </Switch>
      </Router>
  );
}
export default App;
