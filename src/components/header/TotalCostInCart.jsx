import React, { useEffect, useState } from "react";

const TotalCostInCart = ({ product }) => {
  const [price, setPrice] = useState(1);
  const [total, setTotal] = useState(1);

  const calcEachProductTotal = () => {
    console.log("product", product);
    if (product?.discountPercent) {
      let discountPrice = product?.price * (product?.discountPercent / 100);
      let newPrice = product?.price - discountPrice;
      setPrice(newPrice);
    } else {
      setPrice(product.price);
    }
  };
  const calcTotal = () => {
    setTotal((price * product.count).toFixed(2));
  };
  useEffect(() => {
    calcEachProductTotal();
  }, [product]);

  useEffect(() => {
    calcTotal();
  }, [price, product.count]);

  return <div className="totalPrice">{total} ₺</div>;
};

export default TotalCostInCart;
