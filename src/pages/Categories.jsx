import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FilterArea from "../components/filter/FilterArea";
import "../assets/filter.scss";
import Category from "../components/common/Category";

const Categories = () => {
  const { categories } = useSelector((state) => state.data);

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);

  return (
    <div className="container">
      <div className="customPageWrapper">
        <div className="row">
          <div className="col-3">
            <FilterArea />
          </div>
          <div className="col-9">
            <div className="categoriesWrapper row">
              {categories.length > 0 &&
                categories?.map((category) => (
                  <Category category={category} key={category.id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
