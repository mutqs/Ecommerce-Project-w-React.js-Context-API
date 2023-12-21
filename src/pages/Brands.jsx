import React from "react";
import { useSelector } from "react-redux";
import FilterArea from "../components/filter/FilterArea";
import "../assets/filter.scss";
import Brand from "../components/common/Brand";

const Brands = () => {
  const { brands } = useSelector((state) => state.data);
  return (
    <div className="container">
      <div className="customPageWrapper">
        <div className="row">
          <div className="col-3">
            <FilterArea />
          </div>
          <div className="col-9">
            <div className="brandsWrapper row">
              {brands.length > 0 &&
                brands?.map((brand) => <Brand brand={brand} key={brand.id} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
