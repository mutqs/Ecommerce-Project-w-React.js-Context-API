import React, { useEffect } from "react";
import ProductCard from "../components/common/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFeaturedProducts,
  fetchNewProducts,
  fetchDiscountedProducts,
  fetchBanners,
} from "../redux/dataSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Brand from "../components/common/Brand";
import Category from "../components/common/Category";
import "../assets/product-card.scss";
import "../assets/main.scss";
import MainSlider from "../components/main/MainSlider";

const Main = () => {
  const {
    products,
    brands,
    categories,
    featuredProducts,
    newProducts,
    discountedProducts,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const customSettings = {
    dots: true,
    infinite: true,
    auto: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goRouter = (type) => {
    if (type == "brand") {
      return navigate("/brands");
    }
    return navigate("/categories");
  };

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchNewProducts());
    dispatch(fetchDiscountedProducts());
    dispatch(fetchBanners());
  }, [products]);

  return (
    <div className="container mainPage">
      <div className="mainPageTop">
        <div className="row">
          <div className="col-9">
            <div className="sliderWrapper">
              {/* <Slider {...customSettings}>
                {sliderBanners.length > 0 &&
                  sliderBanners.map((banner) => (
                    <img src={banner.image} alt="" />
                  ))}
              </Slider> */}
              <MainSlider />
            </div>
          </div>
          <div className="col-3">
            <div className="featuredProducts">
              <div className="title">Featured Products</div>
              <Slider {...customSettings}>
                {featuredProducts.length > 0 &&
                  featuredProducts.map((product) => (
                    <ProductCard
                      product={product}
                      type={"carousel"}
                      key={product.id}
                    />
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="allProducts">
        <div className="title">All Products</div>
        <Slider {...settings}>
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard
                product={product}
                type={"carousel"}
                key={product.id}
              />
            ))}
        </Slider>
      </div>
      <div className="newProducts">
        <div className="title">New Products</div>
        <Slider {...settings}>
          {newProducts.length > 0 &&
            newProducts.map((product) => (
              <ProductCard
                product={product}
                type={"carousel"}
                key={product.id}
              />
            ))}
        </Slider>
      </div>
      <div className="brands">
        <div className="brands-title">
          <span>Brands</span>
          <div onClick={() => goRouter("brand")} className="route">
            See All Brands..
          </div>
        </div>
        <div className="brands-content">
          <div className="row ">
            {brands.length > 0 &&
              brands?.map((brand) => (
                <Brand brand={brand} type={"brand"} key={brand.id} />
              ))}
          </div>
        </div>
      </div>
      <div className="discountedProducts">
        <div className="title">Discounted Products</div>
        <Slider {...settings}>
          {discountedProducts.length > 0 &&
            discountedProducts.map((product) => (
              <ProductCard
                product={product}
                type={"carousel"}
                key={product.id}
              />
            ))}
        </Slider>
      </div>
      <div className="categories">
        <div className="categories-title">
          <span>Categories</span>
          <div onClick={() => goRouter("category")} className="route">
            See All Categories..
          </div>
        </div>
        <div className="categories-content">
          <div className="row ">
            {categories.length > 0 &&
              categories.map((category) => (
                <Category category={category} key={category.id} />
              ))}
          </div>
        </div>
      </div>
      <div className="featuredProducts">
        <div className="title">Featured Products</div>
        <Slider {...settings}>
          {featuredProducts.length > 0 &&
            featuredProducts.map((product) => (
              <ProductCard
                product={product}
                type={"carousel"}
                key={product.id}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Main;
