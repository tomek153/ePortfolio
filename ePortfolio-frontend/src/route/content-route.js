import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeContent from '../components/home/home-content';
import NotFoundContent from '../components/page-not-found';
import LoginContent from '../components/home/home-login-content';
import RegisterContent from '../components/home/home-register-content';

const ContentRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route exact path="/logowanie" component={LoginContent} />
            <Route exact path="/rejestracja" component={RegisterContent} />
            <Route path='*' component={NotFoundContent}/>
        </Switch>
    </BrowserRouter>
)

export default ContentRoute;