import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FavouriteProduct from "../components/favourite/FavouriteProduct.jsx";
import "../assets/favourite.scss";

const Favourites = () => {
  const { favouriteProducts } = useSelector((state) => state.data);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="container">
      <div className="favouriteProductsWrapper">
        {favouriteProducts.length > 0 ? (
          <div className="title">Favourite Products</div>
        ) : (
          <div className="title">There is no favourite producs..</div>
        )}
        {favouriteProducts?.length > 0 && (
          <div className="favouriteProductsInnerWrapper">
            {favouriteProducts?.map((product, index) => (
              <FavouriteProduct
                product={product}
                index={index}
                key={product.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
