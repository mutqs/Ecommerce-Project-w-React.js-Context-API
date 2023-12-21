import { React, useState, useEffect } from "react";
// import { deleteProduct } from "../redux/dataSlice";
import { useNavigate, useLocation } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const ProductCard = ({ product, size, type }) => {
  // const dispatch = useDispatch();
  const [discountedPrice, setDiscountedPrice] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const calcPrice = () => {
    if (product?.discountPercent) {
      let discountPrice = product?.price * (product?.discountPercent / 100);
      let newPrice = product?.price - discountPrice;
      setDiscountedPrice(newPrice.toFixed(2));
    }
  };

  const goRouter = (id) => {
    navigate(`/products/${id}`, { replace: true });
  };
  useEffect(() => {
    calcPrice();
  }, [location]);

  return (
    <div className={size ? `col-lg-${size}` : ""}>
      <div
        className={
          type === "carousel"
            ? "productCardWrapper carousel"
            : "productCardWrapper"
        }
      >
        <div className="productCardImage">
          <img src={product.image} alt="" />
          {product.productType == "New" && (
            <span className="newBadge">New</span>
          )}
          {product.discountPercent && (
            <span className="discountBadge">{product.discountPercent}%</span>
          )}
          {product.productType == "Featured" && (
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
          <FavouriteButton currentProduct={product} />
        </div>
        <div className="productCardBottom">
          <div className="title">{product.name}</div>
          <div className="price">
            {discountedPrice && (
              <span className="new">{discountedPrice} ₺</span>
            )}
            <span className={discountedPrice ? "old" : ""}>
              {product.price} ₺
            </span>
          </div>
          <div onClick={() => goRouter(product.id)} className="button">
            Go To Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
