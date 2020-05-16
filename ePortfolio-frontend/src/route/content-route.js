import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeContent from '../components/home/home-content';
import NotFoundContent from '../components/page-not-found';
import LoginContent from '../components/home/home-login-content';
import RegisterContent from '../components/home/home-register-content';
import ResetPasswordRequest from '../components/home/home-reset-password-request';
import ResetPasswordLinkSuccess from '../components/home/home-reset-password-link';
import RegulationsContent from '../components/home/home-regulations-content';
import ContactContent from '../components/home/home-contact-content';
import ConfirmationLinkSuccess from '../components/home/home-register-confirmation-link';
import UserProfile from '../components/user/user-profile';
import TestUser from '../components/user/test';

const ContentRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route exact path="/logowanie" component={LoginContent} />
            <Route exact path="/rejestracja" component={RegisterContent} />
            <Route exact path="/regulamin" component={RegulationsContent} />
            <Route exact path="/zapomnialem_hasla" component={ResetPasswordRequest} />
            <Route exact path="/moj-profil" component={UserProfile} />
            <Route exact path="/kontakt" component={ContactContent} />
            <Route exact path="/register_link/:idKey/:registerKey" component={ConfirmationLinkSuccess} />
            <Route exact path="/reset_password_link/:idKey/:registerKey" component={ResetPasswordLinkSuccess} />
            <Route exact path="/test-user" component={TestUser} />
            <Route path='*' component={NotFoundContent}/>
        </Switch>
    </BrowserRouter>
)

export default ContentRoute;