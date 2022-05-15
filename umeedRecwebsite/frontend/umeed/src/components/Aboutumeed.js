import React, { Component } from "react";
import "./Aboutumeed.css";
class Aboutumeed extends Component {
  render() {
    return (
      <div>
        <section class="aboutumeed-container">
          <h1 class="heading">About Umeed</h1>
          <p>
            Umeed, established in July 2015 is a registered society that provide
            services for children and young adults with developmental
            difficulties.This foundation provides quality intervention for the
            children while also promoting increased societal awareness and
            sensitivity towards their needs. The founder of Umeed is himself a
            student of Rajkiya engineering college sonbhadra Er.Ajit Kushwaha
            (Software Engineer at HCL Technologies). And this was the motivating
            source towards starting of Umeed as she found it very difficult to
            find services under one roof that would cater to the needs of her
            child.
          </p>
          <p>
            {" "}
            Thus in order to fulfill this aspiration has brought together a
            great team of educators, speech therapists, occupational therapists,
            behaviour therapists etc under one roof so that Umeed is able to
            cater to all deviant needs of our children .
          </p>
          <div class="box-container">
            <div class="bcard-container">
              <div class="card">
                <img src="imgs/Director..png" alt="Avatar" />
              </div>
              <div class="about-card-container">
                <p class="about-card-container-title">
                  <b>Prof. Geetam Singh Tomar</b>
                </p>
                <p>Director </p>
                <p>Rajkiya Engineering college Sonbhadra</p>
              </div>
            </div>
            <div class="bcard-container">
              <div class="card">
                <img src="imgs/headofumeed.jpg" alt="Avatar" />
              </div>
              <div class="about-card-container">
                <p class="about-card-container-title">
                  <b>Dr. Ravi Prakash Triphathi</b>
                </p>
                <p>Mentor of Umeed</p>
                <p>Rajkiya Engineering college Sonbhadra</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Aboutumeed;
