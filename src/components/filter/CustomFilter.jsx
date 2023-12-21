import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const CustomFilter = () => {
  const { categories, brands } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();

  // const [baseUrl, setBaseUrl] = useState("/products?");
  const [inputValue, setInputValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const setProductName = (value) => {
    setInputValue(value);
    // console.log("inputValue", inputValue);
  };
  const setCategoryType = (value) => {
    setCategoryId(value);
    // console.log("categoryId", categoryId);
  };
  const setBrandType = (value) => {
    setBrandId(value);
    // console.log("brandId", brandId);
  };

  let baseUrl = `/products?`;

  const setRoutePath = () => {
    if (inputValue) {
      baseUrl = baseUrl + `&q=${inputValue}`;
    }
    if (categoryId) {
      baseUrl = baseUrl + `&categoryId=${categoryId}`;
    }
    if (brandId) {
      baseUrl = baseUrl + `&brandId=${brandId}`;
    }
    return baseUrl;
  };

  const resetForm = () => {
    setInputValue("");
    setCategoryId("");
    setBrandId("");
  };

  const routeFilter = (e) => {
    setRoutePath();
    navigate(baseUrl);
    resetForm();
    e.preventDefault();
  };

  return (
    <div className="customFilterWrapper">
      <div className="customFilterTitle">Custom Filter</div>
      <form
        type="submit"
        onSubmit={(e) => routeFilter(e)}
        className="customFilterContent"
      >
        <div className="customFilterInputWrapper">
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            value={inputValue}
            placeholder="Search a product.."
          />
        </div>
        <div className="customFilterSelectWrapper">
          <div className="selectTitle">Select a Category</div>
          <select
            onChange={(e) => setCategoryType(e.target.value)}
            name="category"
            id="category"
            value={categoryId}
          >
            <option value="default">Choose One..</option>
            {categories.map((categoryOption) => (
              <option value={categoryOption.id} key={categoryOption.id}>
                {categoryOption.name}
              </option>
            ))}
          </select>
        </div>
        <div className="customFilterSelectWrapper">
          <div className="selectTitle">Select a Brand</div>
          <select
            onChange={(e) => setBrandType(e.target.value)}
            name="brand"
            id="brand"
            value={brandId}
          >
            <option value="default">Choose One..</option>
            {brands?.map((brandOption) => (
              <option value={brandOption.id} key={brandOption.id}>
                {brandOption.name}
              </option>
            ))}
          </select>
        </div>
        <button className="customFilterButton">Search</button>
      </form>
    </div>
  );
};

export default CustomFilter;
