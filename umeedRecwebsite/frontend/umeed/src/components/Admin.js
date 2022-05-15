import React, { Component } from "react";

import "./Admin.css";
import {
  Adminsidebar,
  Ragistratonf,
  AddTeacher,
  StudentRagistraton,
  PostNotification,
  StudentweeklyMaterial,
} from "./";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
class Admin extends Component {
  render() {
    return (
      <div id="page">
        <header>
          <div className="admin-head-name">
            <h3>Umeed Admin Panel</h3>
          </div>
        </header>
        <nav>
          <Adminsidebar />
        </nav>
        <main>
          <Ragistratonf />

          {/* <Router>
              <Route
                exact={true}
                path="/admin/addteacher"
                component={AddTeacher}
              />
              <Route
                exact={true}
                path="/admin/addstudent"
                component={StudentRagistraton}
              />
              <Route
                exact={true}
                path="/admin/postnotification"
                component={PostNotification}
              />
              <Route
                exact={true}
                path="/admin/studentcontent"
                component={StudentweeklyMaterial}
              />
            </Routes>
          </Router> */}
        </main>
      </div>
    );
  }
}

export default Admin;
