import React, { Component } from 'react';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import md5 from 'md5-hash'

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
    var e3 = document.getElementById("msg-err-password"); 
    var e4 = document.getElementById("msg-err-empty");
    e1.classList.remove("show");
    e2.classList.remove("show");
    e3.classList.remove("show");
    e4.classList.remove("show");
    e1.classList.add("hide");
    e2.classList.add("hide");
    e3.classList.add("hide");
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

function showErrorBox_Password(){
    var e = document.getElementById("msg-err-password"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showErrorBox_Empty(){
    var e = document.getElementById("msg-err-empty"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

class UserProfileDelete extends Component {

    state = {
        id: null,
        passwordStart: '',
        passwordCheck: '',
        checkbox: 'off'
    }

    async componentDidMount() {

        let connectionError = false;

        {/*
            DOSTĘPNE ID:
            1a1d1d84-be02-4184-a26f-565302a0a9ab | uzupełnione
            67d37b2e-428f-4ec4-9525-668383def1db | nowy user
            148deb3a-a0ae-4f16-bd45-86ffa2bf28a7 | user do edycji
        */}

        let id = "148deb3a-a0ae-4f16-bd45-86ffa2bf28a7"
        const urlMain = "http://localhost:8080/api/users/id/";

        const responseUserMain = await fetch(urlMain + id).catch(error => error);

        if(responseUserMain != "[object Response]"){
            connectionError = true;
        }

        if (connectionError){
            var h1 = document.getElementById("container-delete-form"); 
            var h2 = document.getElementById("submit-button");
            h1.className += " hide"; 
            h2.className += " disabled"; 
            var s = document.getElementById("error-box-523"); 
            s.className += " show"; 
            return;
        } else {
            const dataUserMain = await responseUserMain.json();
            this.setState({id: dataUserMain.id})
            this.setState({passwordStart: dataUserMain.password})

        } 
    }

    submitFormAndSend(event) {

        clearMessages();

        let id = "148deb3a-a0ae-4f16-bd45-86ffa2bf28a7"

        const urlMain = "http://localhost:8080/api/users/delete/";
        const urlBio = "http://localhost:8080/api/users-bio/delete/";

        let pass = md5(this.state.passwordCheck);

        if(pass != this.state.passwordStart) {
            showErrorBox_Password();
        } else if(this.state.checkbox != 'on') {
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
                        superagent
                        .get(urlBio + id)
                        .set('Content-Type', 'application/json')
                        .send('')
                        .end((err, res) => {
                            if(err) {
                                showErrorBox(); 
                                return;
                            } else {
                                showSuccessBox();
                                sleep(4000).then(() => { window.location.href='/';});
                            }
                        }); 
                    }
                }
                );   
            
        }
    }

    handlePasswordChanged(event) {
        this.state.passwordCheck = event.target.value.trim();
    }

    handleCheckboxChanged(event) {
        if(this.state.checkbox == 'off'){ this.setState({checkbox: 'on'})}
        if(this.state.checkbox == 'on'){ this.setState({checkbox: 'off'})}
    }


render() {

    return (
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

                                <div className="row">
                                    <div className="col-12 col-md-6 user-delete-password delete-password-checkbox">
                                    
                                        <Form.Group as={Col} controlId="formPassword">
                                            <Form.Control type="password" placeholder="Hasło..." onChange={this.handlePasswordChanged.bind(this)}/>
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

                                            <div className="col-12 message-failure hide" id="msg-err-password">
                                                <p><b>Błąd!</b> Podane hasło jest niepoprawne.</p>
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
    )
}

}

export default UserProfileDelete;