import React, { useEffect } from 'react';
import './App.css';
import './Css/animations.css';
import './Css/auth-header.css';
import './Css/auth.css';
import './Css/profile.css';
import './Css/start.css';

import ContentRoute from './Route/content-route';
import HeaderRoute from './Route/header-route';
import LoadingPage from "./Components/Other/loading-page";

function App() {

    let userInfoTest;
    const [userInfo, setUserInfo] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [tokenValid, setTokenValid] = React.useState(false);
    const [authNeeded, setAuthNeeded] = React.useState(false);

    useEffect(() => {
        if (window.location.href.toString().includes("/logowanie") ||
            window.location.href.toString().includes("/moj-profil")) {

            checkIsAuth();
            setAuthNeeded(true);
        }
    }, []);



    const checkIsAuth = () => {

        let tokenPresent = false;
        const token = localStorage.getItem("token");
        if (token != null && token !== "")
            tokenPresent = true;

        if (tokenPresent) {

            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', token);
            myHeaders.append('Accept', 'application/json');

            const request = new Request(
                'http://localhost:8080/api/user/check_token',
                {
                method: 'GET',
                headers: myHeaders,
                }
            );

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    if (data.message === "token_valid.") {
                        setUserInfo(data.user);
                        userInfoTest = data.user;
                        setTokenValid(true);
                        if (window.location.href.toString().includes("/logowanie"))
                            window.location.replace("/moj-profil");
                        else
                            setLoading(false);

                    } else {
                        localStorage.removeItem("token");
                        if (!window.location.href.toString().includes("/logowanie"))
                            window.location.replace("/logowanie");
                        else
                            setLoading(false);

                    }

                });

        } else {
            if (!window.location.href.toString().includes("/logowanie"))
                window.location.replace("/logowanie");
            else
                setLoading(false);
        }
    };

    if (authNeeded) {

        if (loading) {
            return <LoadingPage/>
        } else {
            return (
                <>
                    <HeaderRoute userInfo={userInfo} tokenValid={tokenValid}/>
                    <ContentRoute/>
                </>
            );
        }
    } else {
        return (
            <>
              <HeaderRoute/>
              <ContentRoute/>
            </>
        );
    }
}

export default App;
