import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const logos = [
  '/path/to/logo1.png',
  '/path/to/logo2.png',
  '/path/to/logo3.png',
  // Add paths to all your logos here
];

const LogoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {logos.map((logo, index) => (
        <div key={index}>
          <img src={logo} alt={`Logo ${index}`} style={{ width: '100%' }} />
        </div>
      ))}
    </Slider>
  );
};

export default LogoSlider;
