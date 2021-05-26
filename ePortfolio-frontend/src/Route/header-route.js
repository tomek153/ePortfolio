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
            <Route exact path="/moj-profil" render={() => <AuthHeader activePage="profile" userInfo={props}/>}/>
            <Route exact path="/wyszukiwarka" render={() => <AuthHeader activePage="searching" userInfo={props}/>}/>
            <Route exact path="/wiadomosci" render={() => <AuthHeader activePage="chat" userInfo={props}/>}/>
            <Route path="/wyszukiwarka/profil/:id" render={() => <AuthHeader userInfo={props}/>}/>
            <Route path="/logowanie" component={HomeHeader}/>
            <Route path="/rejestracja" component={HomeHeader}/>
            <Route path='*' component={HomeHeader}/>
        </Switch>
    </BrowserRouter>
)

export default HeaderRoute;
