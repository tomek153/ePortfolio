import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeHeader from '../components/home/home-header';

const HeaderRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeHeader} />
            <Route path="/logowanie" />
            <Route path='*' component={HomeHeader}/>
        </Switch>
    </BrowserRouter>
)

export default HeaderRoute;