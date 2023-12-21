import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavouriteButton from "../common/FavouriteButton";
import { addProductToCart } from "../../redux/cartSlice";

const ProductAreaTop = () => {
  const { currentProduct } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [discountedPrice, setDiscountedPrice] = useState();

  const [cartCount, setCartCount] = useState(1);

  const calcPrice = () => {
    if (currentProduct?.discountPercent) {
      let discountPrice =
        currentProduct?.price * (currentProduct?.discountPercent / 100);
      let newPrice = currentProduct?.price - discountPrice;
      setDiscountedPrice(newPrice.toFixed(2));
    }
  };

  const addProduct = () => {
    let tempProduct = { ...currentProduct, count: 0 };
    dispatch(addProductToCart({ tempProduct, cartCount }));
    setCartCount(1);
    console.log("asda");
    // console.log("cart", cart);
  };

  const count = (value) => {
    setCartCount(Number(value));
  };

  useEffect(() => {
    calcPrice();
    setCartCount(1);
    // console.log("currentProduct", currentProduct);
  }, [currentProduct]);

  return (
    <>
      <div className="productAreaTop">
        <div className="row">
          <div className="col-lg-5">
            <div className="productLeft">
              <img src={currentProduct?.image} alt="" />
              <div className="productBadgeWrapper">
                {currentProduct?.discountPercent && (
                  <span className="discountPercent">
                    {currentProduct?.discountPercent} %
                  </span>
                )}
                {currentProduct?.productType == "New" && (
                  <span className="newBadge">New</span>
                )}
                {currentProduct?.productType == "Featured" && (
                  <span className="featuredBadge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="18"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="offset-lg-1 col-lg-6">
            <div className="productRight">
              <div className="productTopRight">
                <div className="productTitleArea">
                  <div className="productTitle">{currentProduct?.name}</div>
                  <FavouriteButton currentProduct={currentProduct} />
                </div>
              </div>
              <div className="productType">
                <strong>Type: </strong>
                {currentProduct?.type}
              </div>
              <div className="productType">
                <strong>Product ID: </strong>
                {currentProduct?.id}
              </div>
              <div className="productCategoryId">
                <strong>Category: </strong>
                {currentProduct?.name}
              </div>
              <div className="productDescription">
                {currentProduct?.description}
              </div>
              <div className="productPrice">
                <div className="price">
                  {currentProduct?.discountPercent && (
                    <span className="new">{discountedPrice} ₺</span>
                  )}
                  <span
                    className={currentProduct?.discountPercent ? "old" : ""}
                  >
                    {currentProduct?.price} ₺
                  </span>
                </div>
              </div>
              <div className="addToCart">
                <select
                  name="count"
                  id="count"
                  onChange={(e) => count(e.target.value)}
                  value={cartCount}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button onClick={() => addProduct()}>Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAreaTop;
