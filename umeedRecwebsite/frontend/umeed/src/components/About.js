import React, { Component } from "react";
import "./About.css";
class About extends Component {
  render() {
    return (
      <div>
        <div class="sectiona">
          <div class="containera" align="row-wise">
            <div class="content-sectiona">
              <div class="image-sectiona">
                {/* <img
                  src="Screenshot 2022-02-22 114623.png"
                  alt="Snow"
                  style="width:100%"
                /> */}
                <div class="centered1">A MISSION</div>
                <div class="centered2">WITH A VISION</div>
                <div class="centered3">educating childs since 2015</div>
              </div>
              <div class="title">
                <h1>ABOUT US</h1>
              </div>
              <div class="content">
                <h3>
                  Save the Children is India’s leading independent child rights’
                  NGO, which works in 18 states of the country. Beginning its
                  journey in 2008 in India, and registered as ‘Bal Raksha
                  Bharat’, we have changed the lives of more than 11 million
                  (1.1 crore) children.
                </h3>
                <p>
                  Save the Children is India’s leading independent child rights’
                  NGO, which works in 18 states of the country. Beginning its
                  journey in 2008 in India, and registered as ‘Bal Raksha
                  Bharat’, we have changed the lives of more than 11 million
                  (1.1 crore) children.<span id="dots">...</span>
                  <span id="more">
                    {" "}
                    We firmly believe that every child deserves the best chance
                    for a bright future, which is why, we are fiercely committed
                    to ensure that children not only survive, but thrive. With a
                    bold ambition and a powerful vigilance, we do whatever it
                    takes to save the children.
                  </span>
                </p>
                {}
              </div>
            </div>
            <div class="diva1">
              <h3>Every child receives basic quality education</h3>
            </div>
            <div class="diva2">
              <h3>
                Education is the most powerful weaopen You can use to change the
                World
              </h3>
            </div>
            <div class="diva3">
              <h3>
                Build a world in which every child has the right to survival,
                protection, development, and participation
              </h3>
            </div>
          </div>
        </div>
        <a className="about-a" href="/">
          Back to Top
        </a>
      </div>
    );
  }
}

export default About;
