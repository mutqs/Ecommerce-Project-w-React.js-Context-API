import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/product-detail.scss";
import { getCurrentProduct, BASE_URL } from "../redux/dataSlice";
import ProductAreaTop from "../components/product/ProductAreaTop";
import SimilarProducts from "../components/product/SimilarProducts";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCurrentProduct(`${BASE_URL}/products/${id}`));
  }, [id]);

  return (
    <div className="container">
      <ProductAreaTop />
      <SimilarProducts />
    </div>
  );
};

export default ProductDetail;
