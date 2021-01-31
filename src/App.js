import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import FormLogin from "./Components/User/FormLogin";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FormSignUpFir from "./Components/User/FormSignUpFir";
import TestList from "./Components/Student/TestList";
import FormSignUp from "./Components/User/FormSignUp";
import ClassMemList from "./Components/Teacher/ClassMemList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route exact path="/signup" component={FormSignUpFir} />
          <Route exact path="/stdTestList" component={TestList} />
          <Route exact path="/FormSignUp" component={FormSignUp} />
          <Route exact path="/TchclassMember" component={ClassMemList} />

          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
