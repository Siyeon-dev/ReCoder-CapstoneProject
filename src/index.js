import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";
import Guide from "./components/Guide";
import Router from './components/Router';
import { Route, HashRouter } from 'react-router-dom';


ReactDOM.render(
  <Router />,
  document.getElementById('root')
);