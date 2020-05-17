import React, { Component } from 'react';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class UserProfile extends Component {

    state = {
        userUUID: null,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        userPhone: null,
        userRole: null,
        userConfirmed: null,
        userAddressMain: null,
        userAddressCity: null,
        userAddressZip: null,
        userAddressCountry: null,
        userDateBirth: null,
        userGender: null
    }

    async componentDidMount() {

        let connectionError = false;

        {/*
            DOSTĘPNE ID:
            1a1d1d84-be02-4184-a26f-565302a0a9ab | uzupełnione
            67d37b2e-428f-4ec4-9525-668383def1db | nowy user
        */}

        let id = "1a1d1d84-be02-4184-a26f-565302a0a9ab"
        const urlMain = "http://localhost:8080/api/users/id/";
        const urlBio = "http://localhost:8080/api/users-bio/id/";

        const responseUserMain = await fetch(urlMain + id).catch(error => error);
        const responseUserBio = await fetch(urlBio + id).catch(error => error);

        if(responseUserMain != "[object Response]" || responseUserBio != "[object Response]"){
            connectionError = true;
        }

        if (connectionError){
            var h1 = document.getElementById("container-bio-address"); 
            var h2 = document.getElementById("container-bio-personal"); 
            var h3 = document.getElementById("container-bio-contact"); 
            h1.className += " hide"; 
            h2.className += " hide"; 
            h3.className += " hide"; 
            var s = document.getElementById("error-box-523"); 
            s.className += " show"; 
            return;
        } else {
            const dataUserMain = await responseUserMain.json();
            const dataUserBio = await responseUserBio.json();
        
            this.setState({userUUID: dataUserMain.id})
            this.setState({userFirstName: dataUserMain.firstName})
            this.setState({userLastName: dataUserMain.lastName})
            this.setState({userEmail: dataUserMain.email})
            this.setState({userRole: dataUserMain.role})
            this.setState({userConfirmed: dataUserMain.confirmed})
            this.setState({userPhone: dataUserBio.phone})
            this.setState({userAddressMain: dataUserBio.address_main})
            this.setState({userAddressCity: dataUserBio.address_city})
            this.setState({userAddressZip: dataUserBio.address_zip})
            this.setState({userAddressCountry: dataUserBio.address_country})
            this.setState({userDateBirth: dataUserBio.date_birth})
            this.setState({userGender: dataUserBio.gender})
        } 
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
                                <h1 className="page-title">Mój profil</h1>
                                <hr />
                            </div>
                            <div className="col-md-12 user-profile-error-box-outter" id="error-box-523">
                                <div className="col-md-12 user-profile-error-box">
                                    <h3 className="error-title">Wystąpił błąd!</h3>
                                    <p className="error-text">Dane nie mogły zostać pobrane. Spróbuj za chwilę ponownie. Jeśli problem będzie się powtarzał skontaktuj się z pomocą techniczną.</p>
                                </div>
                            </div>
                            <div className="col-md-12 page-content">
                                <div className="col-12 user-bio-personal-container" id="container-bio-personal">
                                    <div className="row">
                                        <div className="col-10 user-bio-name">

                                            <h2 className="user-name">{this.state.userFirstName} {this.state.userLastName}</h2>
                                            
                                        </div>
                                        <div className="col-2 user-bio-edit">

                                            <a href="#" className="user-bio-edit-link disabled"> <i className="fa fa-cog" aria-hidden="true"></i></a>

                                        </div>
                                    </div>

                                    <div className="row">          
                                        <div className="col-12 user-bio-personal-title">
                                            <h3 className="subtitle">Dane osobowe</h3>
                                        </div>                                  
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6 user-bio-birth user-bio-data-container">
                                        
                                            <p className="user-birth-main-label label">Data urodzenia</p>
                                            <p className="user-birth-main user-bio-data">
                                                {this.state.userDateBirth == '' && <span>-</span>}
                                                {this.state.userDateBirth != '' && <span>{this.state.userDateBirth}</span>}
                                            </p>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-gender user-bio-data-container">
                                        
                                            <p className="user-gender-main-label label">Płeć</p>
                                            <p className="user-gender-main user-bio-data">
                                                {this.state.userGender == '' && <span>-</span>}
                                                {this.state.userGender == 'male' && <span>Mężczyzna</span>}
                                                {this.state.userGender == 'female' && <span>Kobieta</span>}
                                            </p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 user-bio-contact-container" id="container-bio-contact">
                                    <div className="row">          
                                        <div className="col-12 user-bio-contact-title">
                                            <h3 className="subtitle">Dane kontaktowe</h3>
                                        </div>                                  
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6 user-bio-email user-bio-data-container">

                                            <p className="user-email-label label">E-mail</p>
                                            <p className="user-email user-bio-data">{this.state.userEmail}</p>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-phone user-bio-data-container">
                                        
                                            <p className="user-phone-label label">Telefon</p>
                                            <p className="user-phone user-bio-data">
                                                {this.state.userPhone == '' && <span>-</span>}
                                                {this.state.userPhone != '' && <span>{this.state.userPhone}</span>}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 user-bio-address-container" id="container-bio-address">
                                    
                                    <div className="row">          
                                        <div className="col-12 user-bio-address-title">
                                            <h3 className="subtitle">Dane adresowe</h3>
                                        </div>                                  
                                    </div>

                                    <div className="row">
                                        
                                        <div className="col-12 col-md-6 user-bio-address-main user-bio-data-container">

                                            <p className="user-address-main-label label">Adres</p>
                                            <p className="user-address-main user-bio-data">
                                                {this.state.userAddressMain == '' && <span>-</span>}
                                                {this.state.userAddressMain != '' && <span>{this.state.userAddressMain}</span>}
                                            </p>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-address-city user-bio-data-container">
                                        
                                            <p className="user-address-city-label label">Miasto</p>
                                            <p className="user-address-city user-bio-data">
                                                {this.state.userAddressCity == '' && <span>-</span>}
                                                {this.state.userAddressCity != '' && <span>{this.state.userAddressCity}</span>}
                                            </p>

                                        </div>

                                        <div className="col-12 col-md-6 user-bio-address-zip user-bio-data-container">

                                            <p className="user-address-zip-label label">Kod pocztowy</p>
                                            <p className="user-address-zip user-bio-data">
                                                {this.state.userAddressZip == '' && <span>-</span>}
                                                {this.state.userAddressZip != '' && <span>{this.state.userAddressZip}</span>}
                                            </p>

                                            </div>
                                            <div className="col-12 col-md-6 user-bio-address-country user-bio-data-container">

                                            <p className="user-address-country-label label">Kraj</p>
                                            <p className="user-address-country user-bio-data">
                                                {this.state.userAddressCountry == '' && <span>-</span>}
                                                {this.state.userAddressCountry != '' && <span>{this.state.userAddressCountry}</span>}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserProfile;