import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeContent from '../Components/Home/home';
import NotFoundContent from '../Components/Other/page-not-found';
import LoginContent from '../Components/Login/login';
import RegisterContent from '../Components/Register/register';
import ResetPassword from '../Components/Login/reset-password';
import RegulationsContent from '../Components/Other/regulations';
import ConfirmationLinkSuccess from '../Components/Home/register-confirmation-link';
import AuthProfile from '../Components/UserProfile/user-profile';
import Searching from "../Components/Searching/searching";
import UserProfile from "../Components/Searching/user-profile";

const ContentRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route exact path="/logowanie" component={LoginContent} />
            <Route exact path="/rejestracja" component={RegisterContent} />
            <Route exact path="/regulamin" component={RegulationsContent} />
            <Route exact path="/moj-profil" component={AuthProfile} />
            <Route exact path="/wyszukiwarka" component={Searching} />
            <Route exact path="/aktywacja-konta/:idKey/:registerKey" component={ConfirmationLinkSuccess} />
            <Route exact path="/wyszukiwarka/profil/:id" component={UserProfile} />
            <Route exact path="/reset-hasla/:idKey/:registerKey" component={ResetPassword} />
            <Route path='*' component={NotFoundContent}/>
        </Switch>
    </BrowserRouter>
)

export default ContentRoute;
