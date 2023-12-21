import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main";
import Filter from "./pages/Filter";
import ProductDetail from "./pages/ProductDetail";
import Favourites from "./pages/Favourites";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import "./assets/header.scss";
import "./assets/footer.scss";
import "./assets/main.scss";
import "./assets/filter.scss";
import "./assets/paginate.scss";
import "./assets/product-card.scss";
import "./assets/selection.scss";
import "./assets/favourite.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index path="" element={<Main />} />
          <Route path="/products" element={<Filter />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
