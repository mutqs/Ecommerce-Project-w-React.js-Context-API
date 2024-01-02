import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToFavourites } from "../../redux/dataSlice";

const FavouriteProduct = ({ product, index }) => {
  // const { favPro } = useSelector((state) => state.data);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const goRouter = (id) => {
    navigate(`/products/${id}`, { replace: true });
  };

  // useEffect(() => {
  //   console.log("location.pathname", location.pathname);
  // }, [favPro.length]);

  const addProduct = () => {
    dispatch(addProductToFavourites(product));
  };
  return (
    <div className="favouriteProduct">
      <div className="index">{`${index + 1}-`} </div>
      <div className="productCardImage">
        <img src={product.image} alt="" />
      </div>
      <div className="productCardBottom">
        <div className="title">{product.name}</div>
        <div className="price">{product.price} ₺</div>
        <div onClick={() => goRouter(product.id)} className="button">
          Details
        </div>
        <div
          onClick={() => addProduct(product)}
          className="deleteFromFavourite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FavouriteProduct;
