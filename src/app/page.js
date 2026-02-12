import React from "react";
// import OurProducts from "./lib/products";
import OurProducts from "./components/ourProducts/page";
import OurServices from "./components/ourServices/page";
import Footer from "./components/Footer/page";
const Home = () => {
  return (
    <div className="w-100%">
      <video
        autoPlay
        muted
        loop
        src="/Videos/mack-book-video.mp4"
        className="w-full"
      />
      <OurServices />
      <OurProducts />
      <div className="w-full p-10">
        <img src="/header-images/maxresdefault.jpg" className="w-full" />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
