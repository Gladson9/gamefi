// Components
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Header from "./components/Header";

// Styles
import GlobalStyles from "./components/GlobalStyles";
// Router
import { Route } from "react-router";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Header />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
