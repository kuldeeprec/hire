import React, { Component } from "react";

class PostNotification extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="admin-student-ragister">
            <h4>Post Notification</h4>
            <center>
              <form>
                <div className="admin-container">
                  <div class="admin-container-row">
                    <div class="admin-container-col-25">
                      <label for="fname">Notification title</label>
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
                      <label for="fname">Link </label>
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
                    <input type="submit" value="Submit" />
                  </div>
                </div>
              </form>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default PostNotification;
