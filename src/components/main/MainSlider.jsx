import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBanners } from "../../redux/dataSlice";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);

const MainSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sliderBanners } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchBanners());
  }, []);

  const test = (id) => {
    navigate(`/products?categoryId=${id}`);
  };

  return (
    <div className="mainSlider">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={2000}
        organicArrows={false}
      >
        {sliderBanners?.length > 0 &&
          sliderBanners?.map((banner) => (
            <div
              className="sliderItem"
              onClick={() => test(banner.categoryId)}
              data-src={banner.image}
            />
          ))}
        {/* <div data-src="/path/to/image-1.png" />
        <div data-src="/path/to/image-2.jpg" /> */}
      </AutoplaySlider>
    </div>
  );
};

export default MainSlider;
