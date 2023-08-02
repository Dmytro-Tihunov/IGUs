import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Headerlogo from "./components/Header/Headerlogo";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import CategoryPage from "./pages/CategoryPage";
import Loginpage from "./pages/Login/Loginpage";
import Singuppage from "./pages/Signup/Singuppage";
import ResetPassword from "./pages/ResetPassword/RestorePassPage";
import UpdatePassPage from "./pages/UpdatePassword/UpdatePassPage";
import Error from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useStore from "./store";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { getCategories, getTools, getUsersScores } = useStore();
  const { user } = useAuth();

  useEffect(() => {
    getTools()
    getCategories()
    if (user){
      getUsersScores(user.id)
    }
  }, []); 

  return (
    <div className="App">
      <BrowserRouter>
        <Headerlogo />
        <Header linkOne="Login" linkTwo="signup" />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/category/:slug">
            <CategoryPage />
          </Route>
          <Route path="/login">
            <Loginpage />
          </Route>
          <Route path="/signup">
            <Singuppage />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/update-password">
            <UpdatePassPage />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
