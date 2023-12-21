import React from "react";
import { useNavigate } from "react-router-dom";

const MenuItemBrand = ({ menuItem }) => {
  const navigate = useNavigate();
  const goRouter = (id) => {
    navigate(`/products?&brandId=${id}`, { replace: true });
  };
  return (
    <div onClick={() => goRouter(menuItem.id)} className="menuItem">
      {menuItem.name}
    </div>
  );
};

export default MenuItemBrand;
