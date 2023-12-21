import React from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ menuItem }) => {
  const navigate = useNavigate();
  const goRouter = (id) => {
    navigate(`/products?categoryId=${id}`);
  };
  return (
    <div onClick={() => goRouter(menuItem.id)} className="menuItem">
      {menuItem.name}
    </div>
  );
};

export default MenuItem;
