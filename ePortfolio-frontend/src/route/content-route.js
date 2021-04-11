import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomeContent from '../components/views/home';
import NotFoundContent from '../components/page-not-found';
import LoginContent from '../components/views/home-login';
import RegisterContent from '../components/views/home-register';
import ResetPassword from '../components/views/home-reset-password';
import RegulationsContent from '../components/views/home-regulations';
import ConfirmationLinkSuccess from '../components/views/home-register-confirmation-link';
import AuthProfile from '../components/elements/auth-profile';

const ContentRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route exact path="/logowanie" component={LoginContent} />
            <Route exact path="/rejestracja" component={RegisterContent} />
            <Route exact path="/regulamin" component={RegulationsContent} />
            <Route exact path="/moj-profil" component={AuthProfile} />
            <Route exact path="/aktywacja-konta/:idKey/:registerKey" component={ConfirmationLinkSuccess} />
            <Route exact path="/reset-hasla/:idKey/:registerKey" component={ResetPassword} />
            <Route path='*' component={NotFoundContent}/>
        </Switch>
    </BrowserRouter>
)

export default ContentRoute;
