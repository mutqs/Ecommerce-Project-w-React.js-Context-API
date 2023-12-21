import React from "react";
import { useDispatch } from "react-redux";

import { sortFilteredProducts } from "../../redux/dataSlice";
const Select = () => {
  const dispatch = useDispatch();
  return (
    <div className="selectArea">
      <span>Sort by Price..</span>
      <select
        onChange={(e) => dispatch(sortFilteredProducts(e.target.value))}
        name="filter"
        id="filter"
      >
        <option value="default">Choose..</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};

export default Select;
