import { React, useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginate = ({ gamesPerPage, totalGames, paginate }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeIndex, setActiveIndex] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const setActivePage = (number) => {
    paginate(number);
    setActiveIndex(number);
    const param = searchParams.get("p");
    if (param) {
      searchParams.delete("p");
      setSearchParams(searchParams);
    }
    let firstTempData = location.search?.split("p")[0];
    if (firstTempData.includes("&")) {
      let lastTempData = firstTempData.replace("&", "");
      return navigate({
        pathname: "/products",
        search: `${lastTempData}&p=${number}`,
      });
    }
    return navigate({
      pathname: "/products",
      search: `${firstTempData}&p=${number}`,
    });
  };

  const getPage = () => {
    let tempData = location?.search.split("p")[1];
    let pageIndex = tempData?.split("=")[1];
    // console.log("pageIndex", pageIndex);
    if (!pageIndex) {
      paginate(1);
      return setActiveIndex(1);
    }
    paginate(pageIndex);
    return setActiveIndex(pageIndex);
    // setActivePage(pageIndex);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    console.log("location", location);
  }, [location]);

  useEffect(() => {
    getPage();
  }, []);

  return (
    <>
      <div className="container">
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number, index) => (
              <li
                key={number}
                className={
                  activeIndex == index + 1 ? "pageItem active" : "pageItem"
                }
              >
                <div
                  onClick={() => setActivePage(number)}
                  className="page-link"
                >
                  {number}
                </div>
              </li>
            ))}
            {/* {console.log(gamesPerPage)} */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Paginate;
