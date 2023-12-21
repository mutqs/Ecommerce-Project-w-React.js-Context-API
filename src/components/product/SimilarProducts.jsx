import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSimilarProducts, BASE_URL } from "../../redux/dataSlice";
import ProductCard from "../common/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimilarProducts = () => {
  const dispatch = useDispatch();
  const { currentProduct, similarProducts } = useSelector(
    (state) => state.data
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(
      getSimilarProducts(
        `${BASE_URL}/products?categoryId=${currentProduct?.categoryId}`
      )
    );
  }, [currentProduct]);

  //   useEffect(() => {
  //     setProducts();
  //     // console.log("id", id);
  //     console.log("products", products);
  //   }, [id, products]);

  return (
    <div className="similarProductsWrapper">
      {similarProducts.length > 0 ? (
        <div className="title">Similar Products</div>
      ) : (
        "No Similar Products Found.."
      )}
      {similarProducts.length > 4 ? (
        <Slider {...settings}>
          {similarProducts.map((product) => (
            <ProductCard product={product} type={"carousel"} key={product.id} />
          ))}
        </Slider>
      ) : (
        <div className="similarNotSlideWrapper row">
          {similarProducts.map((product) => (
            <ProductCard
              product={product}
              size={3}
              type={"carousel"}
              key={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
