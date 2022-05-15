import React, { Component } from "react";

class Ragistratonf extends Component {
  render() {
    return (
      <div>
        <div className="admin-student-ragister">
          <h4>student ragistration</h4>
          <center>
            <form>
              <div className="admin-container">
                <div class="admin-container-row">
                  <div class="admin-container-col-25">
                    <label for="fname">Full Name</label>
                  </div>
                  <div class="admin-container-col-75">
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Your name.."
                    />
                  </div>
                  <div class="admin-container-col-25">
                    <label for="fname">ROll no </label>
                  </div>
                  <div class="admin-container-col-75">
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Your roll no.."
                    />
                  </div>
                </div>
                <div class="admin-container-row">
                  <div class="admin-container-col-25">
                    <label for="fname">Password</label>
                  </div>
                  <div class="admin-container-col-75">
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Enter password.."
                    />
                  </div>
                  <div class="admin-container-col-25">
                    <label for="fname">Confirm Password </label>
                  </div>
                  <div class="admin-container-col-75">
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Re-enter password.."
                    />
                  </div>
                </div>
                <div class="admin-container-row">
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

export default Ragistratonf;
