import React, { Component } from 'react';

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
        userDateBirth: null
    }

    async componentDidMount() {
        let id = "07e89215-8de7-4c81-a973-f418454b654f"
        const urlMain = "http://localhost:8080/api/users/id/";
        const urlBio = "http://localhost:8080/api/users-bio/id/";

        const responseUserMain = await fetch(urlMain + id)
        const responseUserBio = await fetch(urlBio + id)
        const dataUserMain = await responseUserMain.json();
        const dataUserBio = await responseUserBio.json();

        console.log(dataUserMain);

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
    }


    render() {

        return (
            <div className="container-my container">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        {/* START - ONLY FOR DEVELEPMENT! */}
                        {/*
                        <div className="col-md-12 col-lg-12 development-div-outter"> 
                            <div className="col-md-12 col-lg-12 development-div"> 
                            
                                <p className="development-title"><i>DEBUG MODE</i></p>

                                <div className="col-md-12 col-lg-12 development-button">

                                    <p>Jan Kowalski</p>

                                </div>

                                <div className="col-md-12 col-lg-12 development-button">

                                    <p>Mariusz Nowak</p>

                                </div>

                            </div>
                        </div>
                        */}
                        {/* END - ONLY FOR DEVELEPMENT! */}
                    </div>

                    <div className="col-md-12 col-lg-6 user-profile-description-my">
                        <div className="col-md-12 page-header">
                            <h1 className="page-title">Mój profil</h1>
                            <hr />
                        </div>
                        <div className="col-md-12 page-content">
                            <p>{this.state.userFirstName}</p>   
                            <p>{this.state.userLastName}</p>   
                            <p>{this.state.userEmail}</p>   
                            <p>{this.state.userPhone}</p>   
                            <p>{this.state.userAddressMain}</p>   
                            <p>{this.state.userAddressCity}</p>   
                            <p>{this.state.userAddressZip}</p>   
                            <p>{this.state.userAddressCountry}</p>   
                            <p>{this.state.userDateBirth}</p>   
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;