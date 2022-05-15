import React, { Component } from "react";

class AddTeacher extends Component {
  render() {
    return (
      <div>
        <div className="admin-student-ragister">
          <h4>Add Teacher</h4>
          <center>
            <form>
              <div className="admin-container">
                <div class="admin-container-row">
                  <div class="admin-container-col-25">
                    <label for="fname">Name</label>
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
                    <label for="fname">Profile Url </label>
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
                    <label for="fname">Gender</label>
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
                    <label for="fname">Date of Birth</label>
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
                  <div class="admin-container-col-25">
                    <label for="fname">Umeed session</label>
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
                    <label for="fname">Class </label>
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
                  <div class="admin-container-col-25">
                    <label for="fname">Mobile</label>
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
                    <label for="fname">Address</label>
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
                  <div class="admin-container-col-25">
                    <label for="fname">About</label>
                  </div>
                  <div class="admin-container-col-75">
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Enter password.."
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

export default AddTeacher;
