import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetcheducator, clearFetchState, setbatch } from "../actions/educator";
import "./Educator.css";
class Educator extends Component {
  setbatch = (batch) => {
    this.props.dispatch(setbatch(batch));
    this.props.dispatch(fetcheducator(batch));
    return;
  };
  componentDidMount() {
    const { batch } = this.props.educator;
    this.props.dispatch(fetcheducator(batch));
  }
  componentWillUnmount() {
    this.props.dispatch(clearFetchState());
  }
  render() {
    const { batch } = this.props.educator;
    const { educator } = this.props.educator;
    console.log(batch);
    return (
      <div>
        <div>
          <button
            className="student-logout"
            onClick={() => this.setbatch(2024)}
          >
            Batch 2024 Educator
          </button>
        </div>
        <div className="educator-table-div">
          {batch === 2024 && (
            <table className="educator-table">
              <tr className="educator-table-display">
                <th>Profile Picture</th>
                <th>Description ( Name, Designation, Email )</th>
                <th>Working as </th>
              </tr>
              {educator.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>
                      <Link to="#" className="logo-display">
                        <img
                          className="logo-display"
                          src={process.env.PUBLIC_URL + `/educator/${e.avatar}`}
                          alt="logo is not display"
                        />
                      </Link>
                    </td>
                    <td>
                      {e.name} <br /> Email: {e.email}
                    </td>
                    <td>{e.about}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div>
          <button
            className="student-logout"
            onClick={() => this.setbatch(2023)}
          >
            Batch 2023 Educator
          </button>
        </div>
        <div className="educator-table-div">
          {batch == 2023 && (
            <table className="educator-table">
              <tr className="educator-table-display">
                <th>Profile Picture</th>
                <th>Description ( Name, Designation, Email )</th>
                <th>Working as </th>
              </tr>
              {educator.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>
                      <Link to="#" className="logo-display">
                        <img
                          className="logo-display"
                          src={process.env.PUBLIC_URL + `/educator/${e.avatar}`}
                          alt="logo is not display"
                        />
                      </Link>
                    </td>
                    <td>
                      {e.name} <br /> Email: {e.email}
                    </td>
                    <td>{e.about}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div>
          <button
            className="student-logout"
            onClick={() => this.setbatch(2022)}
          >
            Batch 2022 Educator
          </button>
        </div>
        <div className="educator-table-div">
          {batch === 2022 && (
            <table className="educator-table">
              <tr className="educator-table-display">
                <th>Profile Picture</th>
                <th>Description ( Name, Designation, Email )</th>
                <th>Working as </th>
              </tr>
              {educator.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>
                      <Link to="#" className="logo-display">
                        <img
                          className="logo-display"
                          src={process.env.PUBLIC_URL + `/educator/${e.avatar}`}
                          alt="logo is not display"
                        />
                      </Link>
                    </td>
                    <td>
                      {e.name} <br /> Email: {e.email}
                    </td>
                    <td>{e.about}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div>
          <button
            className="student-logout"
            onClick={() => this.setbatch(2021)}
          >
            Batch 2021 Educator
          </button>
        </div>
        <div className="educator-table-div">
          {batch === 2021 && (
            <table className="educator-table">
              <tr className="educator-table-display">
                <th>Profile Picture</th>
                <th>Description ( Name, Designation, Email )</th>
                <th>Working as </th>
              </tr>
              {educator.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>
                      <Link to="#" className="logo-display">
                        <img
                          className="logo-display"
                          src={process.env.PUBLIC_URL + `/educator/${e.avatar}`}
                          alt="logo is not display"
                        />
                      </Link>
                    </td>
                    <td>
                      {e.name} <br /> Email: {e.email}
                    </td>
                    <td>{e.about}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div>
          <button
            className="student-logout"
            onClick={() => this.setbatch(2020)}
          >
            Batch 2020 Educator
          </button>
        </div>
        <div className="educator-table-div">
          {batch === 2020 && (
            <table className="educator-table">
              <tr className="educator-table-display">
                <th>Profile Picture</th>
                <th>Description ( Name, Designation, Email )</th>
                <th>Working as </th>
              </tr>
              {educator.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>
                      <Link to="#" className="logo-display">
                        <img
                          className="logo-display"
                          src={process.env.PUBLIC_URL + `/educator/${e.avatar}`}
                          alt="logo is not display"
                        />
                      </Link>
                    </td>
                    <td>
                      {e.name} <br /> Email: {e.email}
                    </td>
                    <td>{e.about}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    educator: state.educator,
  };
}
export default connect(mapStateToProps)(Educator);
