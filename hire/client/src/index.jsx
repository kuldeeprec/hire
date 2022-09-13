import React, { useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { lazy } from '@loadable/component';

import "antd/dist/antd.css";
import "./custom-icons.css";
import './index.css';

import ScrollToTop from './utils/scrollToTop';
import Spinner from './components/Spinner/Spinner';
import MobileValidator from './validators/MobileValidator';
import reportWebVitals from './reportWebVitals';

import { getSubdomain } from './utils/common';
import { G_URL, G_API_URL } from "./constants/constants";

const Signin = lazy(() => import("./pages/Authentication/Signin/Signin"));
const Signup = lazy(() => import("./pages/Authentication/Signup/Signup"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Insights = lazy(() => import("./pages/Insights/Insights"));
const StudentTable = lazy(() => import("./pages/StudentTable/StudentTable"));
const ManageUsers = lazy(() => import("./pages/ManageUsers/ManageUsers"));
const InterviewManagement = lazy(() => import("./pages/InterviewManagement/InterviewManagement"));
const TrainingManagement = lazy(() => import("./pages/TrainingManagement/TrainingManagement"));
const DomainManagement = lazy(() => import("./pages/DomainManagement/DomainManagement"));
const Default403 = lazy(() => import('./pages/Default/Default403'));
const Default404 = lazy(() => import('./pages/Default/Default404'));


const history = createBrowserHistory();

const App = () => {

    useEffect(() => {
        const subdomain = getSubdomain();
        if(subdomain) {
            axios.get(G_API_URL + "ogn/check/domain", {
                params: {
                    domain: subdomain
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 0) {
                    window.location.href = G_URL;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    return (
        <Suspense fallback={<Spinner />}>
            <Switch history={history}>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Signin} />
                <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
                <MobileValidator>
                    <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={Settings} />
                    <Route exact path={`${process.env.PUBLIC_URL}/insights`} component={Insights} />
                    <Route exact path={`${process.env.PUBLIC_URL}/candidates-reports`} component={StudentTable} />
                    <Route exact path={`${process.env.PUBLIC_URL}/user-management`} component={ManageUsers} />
                    <Route exact path={`${process.env.PUBLIC_URL}/interview-management`} component={InterviewManagement} />
                    <Route exact path={`${process.env.PUBLIC_URL}/training-management`} component={TrainingManagement} />
                    <Route exact path={`${process.env.PUBLIC_URL}/domain-management`} component={DomainManagement} />
                    <Route exact path={`${process.env.PUBLIC_URL}/forbidden/`} component={Default403} />
                </MobileValidator>
                <Route component={Default404} />
            </Switch>
        </Suspense>
    )
}

ReactDOM.render(
  <Router>
      <ScrollToTop />
      <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
