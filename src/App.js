import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import FormLogin from "./Components/User/FormLogin";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FormSignUpFir from "./Components/User/FormSignUpFir";
import FormSignUp from "./Components/User/FormSignUp";
import Teacher from "./Components/Teacher/Index";
import Student from "./Components/Student/Index";
import CreateTestForm from "./Components/Teacher/Exam/CreateTestForm";
import TestPrecautions from "./Components/Student/Exam/TestPrecautions";
import ProctorExamView from "./Components/Teacher/Exam/ProctorExamView";
import TestScreen from "Components/Student/Exam/TestScreen";
import TestScoringPage from "Components/Teacher/TestScoringPage";

import Test from "test";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/signup" component={FormSignUpFir} />
          <Route exact path="/formSignUp" component={FormSignUp} />
          <Route exact path="/student" component={Student} />
          <Route exact path="/teacher" component={Teacher} />
          <Route path="/teacher/:classCode" component={Teacher} />
          <Route path="/student/:classCode" component={Student} />
          <Route
            path="/testprecautions/:testId/:testName"
            component={TestPrecautions}
          />
          <Route path="/testscreen/:testId/:testName" component={TestScreen} />
          <Route
            path="/proctorexamview/:testId/:testName"
            component={ProctorExamView}
          />
          <Route path="/testscoringpage/:testId" component={TestScoringPage} />

          <Route path="/createtestform/:classCode" component={CreateTestForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
