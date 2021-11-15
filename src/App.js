// Components
import Home from "./pages/Home";
import Nav from "./components/Nav";
// Styles
import GlobalStyles from "./components/GlobalStyles";
// Router
import { Route } from "react-router";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

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

  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route exact path={["/", "/game/:id"]}>
        <Home />
      </Route>
      <Route path="/signup" component={SignUp} exact />
      <Route path="/login" component={Login} exact />
      <PrivateRoute path={["/dashboard", "/game/:id"]} exact>
        <Dashboard />
      </PrivateRoute>
      <Route path="/password_reset" component={PasswordReset} exact />
    </div>
  );
}

export default App;
