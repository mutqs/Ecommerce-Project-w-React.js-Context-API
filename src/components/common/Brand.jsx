import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Brand = ({ brand }) => {
  const [size, setSize] = useState("col-2");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("brands")) {
      return setSize("col-3");
    }
    return setSize("col-2");
  }, [location]);
  const goRouter = (id) => {
    navigate(`/products?brandId=${id}`);
  };
  return (
    <div className={size}>
      <div onClick={() => goRouter(brand.id)} className="insideBrand">
        <div>{brand.name}</div>
      </div>
    </div>
  );
};

export default Brand;
