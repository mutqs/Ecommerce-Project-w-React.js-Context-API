import React from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ menuItem, type }) => {
  const navigate = useNavigate();
  const goRouter = (id) => {
    if (type == "brand") {
      navigate(`/products?brandId=${id}`, { replace: true });
    } else if (type == "category") {
      navigate(`/products?categoryId=${id}`, { replace: true });
    }
  };
  return (
    <div onClick={() => goRouter(menuItem.id)} className="menuItem">
      {menuItem.name}
    </div>
  );
};

export default MenuItem;
