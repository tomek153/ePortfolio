import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeHeader from '../components/views/home-header';
import AuthHeader from '../components/elements/auth-header';

const HeaderRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeHeader} />
            <Route exact path="/moj-profil" render={(props) => <AuthHeader activePage="profile"/>}/>
            <Route path="/logowanie" component={HomeHeader}/>
            <Route path="/rejestracja" component={HomeHeader}/>
            <Route path='*' component={HomeHeader}/>
        </Switch>
    </BrowserRouter>
)

export default HeaderRoute;
