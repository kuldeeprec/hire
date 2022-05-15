import React, { Component } from "react";

class StudentweeklyMaterial extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <div className="admin-student-ragister">
              <h4>Student Weekly Content</h4>
              <center>
                <form>
                  <div className="admin-container">
                    <div class="admin-container-row">
                      <div class="admin-container-col-25">
                        <label for="fname"> content title</label>
                      </div>
                      <div class="admin-container-col-75">
                        <input
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder=" content title.."
                        />
                      </div>
                      <div class="admin-container-col-25">
                        <label for="fname"> content Link </label>
                      </div>
                      <div class="admin-container-col-75">
                        <input
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder=" content Link.."
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
        </div>
      </div>
    );
  }
}

export default StudentweeklyMaterial;
