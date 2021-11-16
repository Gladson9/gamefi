// Components
import Home from "./pages/Home";
import Nav from "./components/Nav";
// Styles
import GlobalStyles from "./components/GlobalStyles";
// Router
import { Route, Switch, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import GameDetail from "./components/GameDetail";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: user,
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    });
  }, [dispatch]);

  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Switch location={background || location}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={Login} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />

        <Route path="/password_reset" component={PasswordReset} exact />
      </Switch>
      {background && <Route path="/game/:id" children={<GameDetail />} />}
    </div>
  );
}

export default App;
