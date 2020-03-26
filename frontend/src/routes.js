import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';

export default function Routes(){
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/casos/novo" component={NovoCaso}></Route>
        </Switch>
      </BrowserRouter>
    );
}