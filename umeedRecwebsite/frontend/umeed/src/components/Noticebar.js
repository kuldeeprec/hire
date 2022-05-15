import React, { Component } from "react";
import "./Noticebar.css";
import { Newscrousel } from "./";
class Noticebar extends Component {
  render() {
    return (
      <div className="Noticebar">
        <div className="cardnotice">
          <div className="cardnotice-header">
            <h2>Notifications</h2>
          </div>
          <div className="cardnotice-main">
            <div className="card-marque">
              <ul className="card-container">
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
                <li className="card-list">
                  <a href="/">lorem ipsum dolor sit amet, consectetur adip</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="cardnews">
          <div className="cardnews-header">
            <h2>Umeed in News</h2>
          </div>
          <div className="cardnews-main">
            <Newscrousel />
          </div>
        </div>
      </div>
    );
  }
}

export default Noticebar;
