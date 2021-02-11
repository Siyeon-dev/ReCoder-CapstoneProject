import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import FormLogin from "./Components/User/FormLogin";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FormSignUpFir from "./Components/User/FormSignUpFir";
import FormSignUp from "./Components/User/FormSignUp";
import Teacher from "./Components/Teacher/";
import Student from "./Components/Student";
import CreateTestForm from "./Components/Teacher/Exam/CreateTestForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route exact path="/signup" component={FormSignUpFir} />
          <Route exact path="/formSignUp" component={FormSignUp} />
          <Route exact path="/student" component={Student} />
          <Route exact path="/teacher" component={Teacher} />
          <Route path="/teacher/:classCode" component={Teacher} />

          <Route
            path="/createtestform/:classCode"
            component={CreateTestForm}
          />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
