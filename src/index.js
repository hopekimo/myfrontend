import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import * as API from './shared/http';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SinglePost from "./pages/post";
import Home from "./pages/home";
import Login from './pages/login';

import { history } from './history';
import { getFirebaseToken } from './backend/auth';

import './styles/styles.scss';

export const renderApp = (state, callback = () => {}) => {
    console.log("renderApp state.user.authenticated =>" + state.user.authenticated);
    console.log("location =>" + state.location);

    ReactDOM.render(
        <Router {...state}>
            <Route path="" component={App} />
            <Switch>
                <Route path="/posts/:rawid" component={SinglePost}/>
                <Route path="/posts" component={Home}/>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home}/>
            </Switch>
        </Router>,
        document.getElementById('app'),
        callback
    );
};

let state = {
    location: window.location.pathname,
    user: {
        authenticated: false,
        profilePicture: null,
        id: null,
        name: null,
        //token: null
    }
};

// Render the app initially
renderApp(state);

history.listen(location => {
    const user = firebase.auth().currentUser;
    state = Object.assign({}, state, {
        location: user ? location.pathname : '/login'
    });
    renderApp(state);
});

firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
        state = {
            location: state.location,
            user: {
                authenticated: false
            }
        };
        return renderApp(state, () => {
            history.push('/login');
        });
    }

    const token = await getFirebaseToken();
    const res = await API.loadUser(user.email);
    let renderUser;
    if (res.status === 404) {
        const userPayload = {
            name: user.displayName,
            profilePicture: user.photoURL,
            id: user.uid
        };
        renderUser = await API.createUser(userPayload).then(res => res.json());
    } else {
        renderUser = await res.json();
    }
    history.push('/');

    // console.log("user.email" + renderUser.userName)
    // console.log("user.email" + renderUser.userId)
    // console.log("user.email" + renderUser.profilePicture)

    state = Object.assign({}, state, {
        user: {
            name: renderUser.userName,
            id: renderUser.userId,
            profilePicture: renderUser.profilePicture,
            authenticated: true
        },
        // token
    });
    renderApp(state);
});

// ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
