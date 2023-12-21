import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Category = ({ category }) => {
  const [size, setSize] = useState("col-2");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("categories")) {
      return setSize("col-3");
    }
    return setSize("col-2");
  }, [location]);

  const goRouter = (id) => {
    navigate(`/products?categoryId=${id}`);
  };

  return (
    <div className={size}>
      <div onClick={() => goRouter(category.id)} className="insideCategory">
        {category.name}
      </div>
    </div>
  );
};

export default Category;
