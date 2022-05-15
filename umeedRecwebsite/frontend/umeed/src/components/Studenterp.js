import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "./Studenterp.css";
import { logoutUser } from "../actions/auth";
import { fetchStudent, clearFetchState } from "../actions/student";
class Studenterp extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    let token = localStorage.getItem("token");
    console.log(token);
    this.props.dispatch(logoutUser());
    this.props.dispatch(clearFetchState());
    console.log("hi");
  };
  componentDidMount() {
    const { auth } = this.props;
    console.log(auth);
    this.props.dispatch(fetchStudent(auth.user.userId));
  }
  componentWillUnmount() {
    this.props.dispatch(clearFetchState());
  }

  render() {
    const { auth, student } = this.props;

    console.log(student.isStudent);

    if (!auth.isLoggedin) {
      return <Navigate to="/" />;
    }
    // if (!student.isStudent) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div>
        <div class="cont1">
          <div class="title1">
            <h2>My Profile</h2>
            {auth.isLoggedin && (
              <button className="student-logout" onClick={this.logOut}>
                logout
              </button>
            )}
          </div>
          <div class="home">
            <a href="/">Go to Home</a>
          </div>
          <div class="title2">
            <h3>My Information</h3>
            <div class="cont2">
              <div class="table1">
                <table>
                  <tr>
                    <td>Name</td>
                    <td>{student.student.name}</td>
                  </tr>
                  <tr>
                    <td>Father's Name</td>
                    <td>{student.student.fatherName}</td>
                  </tr>
                  <tr>
                    <td>Mother's Name</td>
                    <td>{student.student.motherName}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{student.student.gender}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth(DOB)</td>
                    <td>{student.student.dateofbirth}</td>
                  </tr>
                  <tr>
                    <td>Admission Session</td>
                    <td>{student.student.admissionDate}</td>
                  </tr>
                  <tr>
                    <td> Organization Name</td>
                    <td>Umeed Rec Sonbhadra</td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>{student.student.class}</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>{student.student.mobile}</td>
                  </tr>
                  <tr>
                    <td>Email Id</td>
                    <td>{student.student.email}</td>
                  </tr>
                  <tr>
                    <td>Corresponding Address</td>
                    <td>{student.student.addressName}</td>
                  </tr>
                  <tr>
                    <td>District/City</td>
                    <td>{student.student.city}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{student.student.state}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{student.student.country}</td>
                  </tr>
                  <tr>
                    <td>Pincode</td>
                    <td>{student.student.pincode}</td>
                  </tr>
                </table>
              </div>
              <div class="table2">
                <table>
                  <tr>
                    <th>
                      <h3>Roll NO.: {auth.user.userId}</h3>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h3>Enrollment NO.: </h3>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <img
                        className="profile-photo"
                        src={
                          process.env.PUBLIC_URL +
                          `/student/${student.student.avatar}`
                        }
                        alt="Photograph"
                      />
                      <br />
                      <p className="profile-photo">Photograph</p>
                    </th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    student: state.student,
  };
}
export default connect(mapStateToProps)(Studenterp);
