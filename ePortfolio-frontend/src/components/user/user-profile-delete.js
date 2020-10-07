import React, { Component } from 'react';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageLoading from '../page-loading';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function clearMessages(){
    var e1 = document.getElementById("msg-err");
    var e2 = document.getElementById("msg-suc");
    var e4 = document.getElementById("msg-err-empty");
    e1.classList.remove("show");
    e2.classList.remove("show");
    e4.classList.remove("show");
    e1.classList.add("hide");
    e2.classList.add("hide");
    e4.classList.add("hide");
}

function showErrorBox(){
    var e = document.getElementById("msg-err"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showSuccessBox(){
    var e = document.getElementById("msg-suc"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showErrorBox_Empty(){
    var e = document.getElementById("msg-err-empty"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

class UserProfileDelete extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                id: '',               
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                zip: "",
                country: "",
                dateBirth: "",
                gender: "",
                password: "",
                passwordCheck: "",
                
            },
            checkbox: "off",
            tokenExpired: false
        }
    }

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', localStorage.getItem("token"));

        const request = new Request(
            'http://localhost:8080/api/users/profile', 
            {
                method: 'GET', 
                headers: myHeaders
            }
        );

        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            this.setState({user: data});
                        });
                } else if (response.status === 400) {
                    response.json()
                        .then(data => {
                            if (data.message == "Token expired") {
                                window.location.replace("/logowanie?token=expired");
                            } else {
                                window.location.replace("/logowanie?token=bad_token");
                            }
                        });
                } else {
                    window.location.replace("/logowanie?token=bad_token");
                }
            });

        const loader = document.querySelector(".page-loading");
        const nav = document.querySelector(".navbar-my");
        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    nav.style = "visibility: visible";
                    nav.classList.add("animate-nav-in");
                }, 200);
            }, 600);
        };
    }

    submitFormAndSend(event) {

        clearMessages();

        let id = this.state.user.id;

        const urlMain = "http://localhost:8080/api/users/delete/";

        if(this.state.checkbox != 'on') {
            showErrorBox_Empty();
        } 
        
        else {
            superagent
                .get(urlMain + id)
                .set('Content-Type', 'application/json')
                .send('')
                .end((err, res) => {
                    if(err) {

                        showErrorBox(); 

                        return;
                    } else{
                        showSuccessBox();
                        localStorage.removeItem('token');
                        sleep(4000).then(() => {                            
                            window.location.href='/';
                        });
                    }
                }
                );   
            
        }
    }

    handlePasswordChanged(event) {
        this.state.user.passwordCheck = event.target.value.trim();
    }

    handleCheckboxChanged(event) {
        if(this.state.checkbox == 'off'){ this.setState({checkbox: 'on'})}
        if(this.state.checkbox == 'on'){ this.setState({checkbox: 'off'})}
    }


render() {

    return (
        <div>
            <PageLoading />
                <div className="container-my container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">

                        </div>

                        <div className="col-md-12 col-lg-6 user-profile-description-my">
                            <div className="row background-container">
                                <div className="col-md-12 page-header">
                                    <h1 className="page-title">Usunięcie konta</h1>
                                    <hr />
                                </div>
                                <div className="col-md-12 user-profile-error-box-outter" id="error-box-523">
                                    <div className="col-md-12 user-profile-error-box">
                                        <h3 className="error-title">Wystąpił błąd!</h3>
                                        <p className="error-text">Dane nie mogły zostać pobrane. Spróbuj za chwilę ponownie. Jeśli problem będzie się powtarzał skontaktuj się z pomocą techniczną.</p>
                                    </div>
                                </div>
                                <div className="col-md-12 page-content">
                                <Form>   
                                    <div className="col-12 user-bio-personal-container" id="container-delete-form">
                                        <div className="row">
                                            <div className="col-12 user-delete-info delete-info-container">
                                                <p>Uwaga! Usunięcie konta w serwisie ePortfolio jest nieodwracalne. Wszystkie Twoje dane zostaną usunięte z naszych baz danych bez możliwości ich przywrócenia. 
                                                    Kliknięcie na przycisk "Usuń" jest ostatecznym potwierdzeniem zlecenia usunięcia konta.</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-12 user-delete-checkbox delete-info-checkbox">
                                            
                                                <Form.Group controlId="formCheckbox">
                                                    <Form.Check type="checkbox" label="Rozumiem, że usunięcie konta jest nieodwracalne i potwierdzam chęć usunięcia. *" onClick={this.handleCheckboxChanged.bind(this)}/>
                                                </Form.Group>

                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 user-bio-sumbit-container" id="container-submit">
                                    <hr />  
                                            <div className="row">
                                                                    
                                                <div className="col-12 user-bio-edit-message">
                                                    
                                                    <div className="col-12 message-success hide" id="msg-suc">
                                                        <p><b>Operacja zakończona powodzeniem!</b> Konto zostało usunięte. Za chwilę zostaniesz przekierowany...</p>
                                                    </div>

                                                    <div className="col-12 message-failure hide" id="msg-err-empty">
                                                        <p><b>Błąd!</b> Pola oznaczone gwiazdką muszą być uzupełnione.</p>
                                                    </div>

                                                    <div className="col-12 message-failure hide" id="msg-err"> 
                                                        <p><b>Błąd!</b> Edycja danych nie powiodła się.</p>
                                                    </div>

                                                </div>

                                                </div>
                                            <div className="row">

                                            <div className="col-12 col-md-6 user-bio-submit">
                                                <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="update-button" id="submit-button">
                                                        Usuń
                                                </Button>
                                            </div>
                                            <div className="col-12 col-md-4 user-bio-exit">
                                                <Button onClick={event =>  window.location.href='/moj-profil/edytuj'} type="button" variant="primary" className="exit-button">
                                                        Cofnij
                                                </Button>
                                            </div>
                                            <div className="col-12 col-md-2 user-bio-empty">

                                            </div>

                                        </div>
                                    </div>
                                </Form>     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>        
    )
}

}

export default UserProfileDelete;