import Header from './components/Header';
import Footer from './components/Footer';
import FormLogin from './components/FormLogin';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import FormSignUpFir from './components/FormSignUpFir';
import StdTestList from './components/StdTestList';
import FormSignUp from './components/FormSignUp'
import TchClassMem from './components/TchClassMem';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
          <Header />
            <Switch>
              <Route exact path="/" component={FormLogin} />
              <Route exact path="/signup" component={FormSignUpFir} />
              <Route exact path="/stdTestList" component={StdTestList}  />
              <Route exact path="/FormSignUp" component={FormSignUp} />
              <Route exact path="/TchclassMember" component={TchClassMem}  />
            </Switch>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
