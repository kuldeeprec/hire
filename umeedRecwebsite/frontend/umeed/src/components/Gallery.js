import React, { Component } from "react";
import "./gallery.css";
class Gallery extends Component {
  render() {
    return (
      <div>
        <section class="product">
          <span>Student Activities</span>
          <h1 class="heading">Student Activities</h1>
          <p>
            Student activities are integral to an education, providing
            opportunities for all students enrolled to support and <br /> extend
            academic learning .
          </p>
          <div class="box-container">
            <div class="box">
              <img src="imgs/imgr1.jpg" alt="" />
              <h3>
                students in smart class <br />
              </h3>
              <a href="#" class="btn">
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
            <div class="box">
              <img src="imgs/imgr1.jpg" alt="" />
              <h3>
                students in smart class <br />
              </h3>
              <a href="#" class="btn">
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
            <div class="box">
              <img src="imgs/imgr1.jpg" alt="" />
              <h3>
                students in smart class
                <br />
              </h3>
              <a href="#" class="btn">
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Gallery;
