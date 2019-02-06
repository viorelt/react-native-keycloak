import React from 'react';
import LoginComponent from "../components/LoginComponent";
import Secured from "../components/Secured";
import * as qs from "qs";

const keycloakConfig = {
    "realm": "master",
    "serverUrl": "https://b39e8fe9.ngrok.io/auth",
    "resource": "test",
    "public-client": true,
    "confidential-port": 0
};

export default class HomeScreen extends React.Component {
    state = {
        isLoggedIn: false
    };

    render() {
        if (this.state.isLoggedIn)
            return <Secured
                onLogoutPress={() => this.setState({isLoggedIn: false})}
            />;
        else
            return <LoginComponent
                onLoginPress={() => this.getState()}
            />;
    }

    getState = () => {
        let url = keycloakConfig.serverUrl + '/realms/' + keycloakConfig.realm + '/protocol/openid-connect/token';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify({
                "username": "test",
                "password": "test",
                "client_id": "test",
                "grant_type": "password",
                "scope": "open_id"
            }),
        })
            .then((response) =>  response.json())
            .then((responseJson) => console.log(responseJson))

            .catch((error) => {
                console.error(error);
            });


        this.setState({isLoggedIn: true});
    }
}

