import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductFromCart } from "../../redux/cartSlice";
import TotalCostInCart from "./TotalCostInCart";

const CartModal = ({ toggleCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goRouter = (id) => {
    navigate(`/products/${id}`, { replace: true });
  };

  return (
    <>
      {toggleCart && cart.length > 0 && (
        <div className="productsInCart">
          <div className="productsInCartTop">
            <div className="title">Name</div>
            <div className="quantity">Quantity</div>
            <div className="total">Total</div>
          </div>
          {cart.map((product) => (
            <div className="productInCart">
              <span onClick={() => goRouter(product.id)} className="name">
                {product.name}
              </span>
              <div className="productRightInCart">
                <span className="count">{product.count}</span>
                <TotalCostInCart product={product} />
                <div class="buttonsWrapper">
                  <div onClick={() => dispatch(deleteProductFromCart(product))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15"
                      width="15"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CartModal;
