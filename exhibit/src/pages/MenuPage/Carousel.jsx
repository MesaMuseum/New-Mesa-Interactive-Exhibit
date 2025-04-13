import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { px } from "framer-motion";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="bg-white text-black text-xl w-1/2 mx-auto my-5 h-2/5" >
    <Slider {...settings } className="my-custom-slider">
      <div className="h-full">
        <a href="/carousel_1">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_1_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_2">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_2_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_3">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_3_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_4">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_4_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_5">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_5_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_6">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_6_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_7">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_7_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_8">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_8_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_9">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_9_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_10">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_10_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_11">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_11_thumbnail.png"></img>
        </a>
      </div>
      <div>
        <a href="/carousel_12">
          <img className="object-cover h-full w-full" src="/menuPage/carousel_12_thumbnail.png"></img>
        </a>
      </div>
    </Slider>
    </div>
  );
}
export default Carousel;