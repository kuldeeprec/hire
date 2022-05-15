import React, { Component } from "react";
import { NavBar, Noticebar, Slider, Footer, Gallery, Aboutumeed } from "./";
class Home extends Component {
  render() {
    const { auth } = this.props;
    console.log(auth.user.userId);
    return (
      <>
        <NavBar />
        <Slider />
        <Aboutumeed />
        <Noticebar />
        <Gallery />
        <Footer auth={auth} />
      </>
    );
  }
}

export default Home;
