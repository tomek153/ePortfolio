import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeHeader from '../Components/Header/home-header';
import AuthHeader from '../Components/Header/header';

function test() {
    console.log(this.props);
}

const HeaderRoute = (props) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeHeader} />
            <Route exact path="/moj-profil" render={() => <AuthHeader activePage="profile" userInfo={props} test={test}/>}/>
            <Route path="/logowanie" component={HomeHeader}/>
            <Route path="/rejestracja" component={HomeHeader}/>
            <Route path='*' component={HomeHeader}/>
        </Switch>
    </BrowserRouter>
)

export default HeaderRoute;
