import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts, BASE_URL } from "../redux/dataSlice";
import ProductCard from "../components/common/ProductCard";
import "../assets/product-card.scss";
import Select from "../components/filter/Select";
import FilterArea from "../components/filter/FilterArea";
import Paginate from "../components/filter/Paginate";
import Selection from "../components/filter/Selection";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Filter = () => {
  const { filteredProducts } = useSelector((state) => state.data);
  const [selections, setSelections] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  //Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  const indexOfLastGames = currentPage * gamesPerPage;
  const indexOfFirstGames = indexOfLastGames - gamesPerPage;
  const currentGames = filteredProducts.slice(
    indexOfFirstGames,
    indexOfLastGames
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Filter
  let baseUrl = `${BASE_URL}/products?`;

  const setPath = () => {
    baseUrl = baseUrl + `${location?.search}`;
    return baseUrl;
  };

  //Selection
  let query = useQuery();
  const declareSelections = () => {
    if (query?.get("brandId")) {
      setSelections((selections) => [
        ...selections,
        { type: "Brand", value: query?.get("brandId") },
      ]);
    }
    if (query?.get("categoryId")) {
      setSelections((selections) => [
        ...selections,
        { type: "Category", value: query?.get("categoryId") },
      ]);
    }
    if (query?.get("q")) {
      setSelections((selections) => [
        ...selections,
        { type: "Query", value: query?.get("q") },
      ]);
    }
  };

  useEffect(() => {
    setSelections([]);
    setPath();
    declareSelections();
    dispatch(fetchFilteredProducts(baseUrl));
    console.log("baseUrl", baseUrl);
    console.log("location", location);
  }, [location, query]);

  return (
    <div className="filterAreaWrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="filterAreaLeft">
              <FilterArea />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="filterArea">
              <div className="filterAreaTop">
                <div className="filterAreaTopLeft">
                  {selections.map((selection, index) => (
                    <Selection selection={selection} key={index} />
                  ))}
                </div>
                <div className="filterAreaTopRight">
                  {filteredProducts.length > 0 && (
                    <span>
                      <strong>{filteredProducts.length} </strong>
                      Product Exist
                    </span>
                  )}
                  <Select />
                </div>
              </div>
              <div className="productAreaWrapper row">
                {filteredProducts.length > 0
                  ? currentGames.map((product) => (
                      <ProductCard
                        product={product}
                        size={4}
                        key={product.id}
                      />
                    ))
                  : "No Products Found.."}
                {filteredProducts.length > 12 && (
                  <Paginate
                    gamesPerPage={gamesPerPage}
                    totalGames={filteredProducts.length}
                    paginate={paginate}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
