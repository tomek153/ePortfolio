import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeHeader from '../components/home/home-header';
import UserHeader from '../components/user/user-header';

const HeaderRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeHeader} />
            <Route exact path="/moj-profil" component={UserHeader} />
            <Route path="/logowanie" />
            <Route path="/rejestracja" />
            <Route exact path="/loading" />
            <Route path='*' component={HomeHeader}/>
        </Switch>
    </BrowserRouter>
)

export default HeaderRoute;