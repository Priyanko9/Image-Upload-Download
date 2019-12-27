import React,{lazy,Suspense} from 'react';
import './App.css';
import {PrivateRoute} from './privateRoute.js';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';

const ImageUploadDownload = lazy(() => import('./Image.Component.js'));
const Login = lazy(() => import('./Login.Component.js'));
function App(props){
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route  path="/login" component={Login}/>
          <PrivateRoute  path="/userDashboard" component={ImageUploadDownload}/>
          <Redirect exact from="/" to="/login"/>
        </Switch>
        </Suspense>
    </Router>
  )
}

export default App;
