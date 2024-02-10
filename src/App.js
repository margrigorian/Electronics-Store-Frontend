import style from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./hoc/ScrollToTheTop";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/home_page/HomePage";
import LoginPage from "./pages/login_page/LoginPage";
import RegisterPage from "./pages/register_page/RegisterPage";
import ProductCategoriesPage from "./pages/product_categories_page/ProductCategoriesPage";
import ProductListPage from "./pages/product_list_page/ProductListPage";
import SearchPage from "./pages/search_page/SearchPage";
import ProductPage from "./pages/product_page/ProductPage";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <ScrollToTop />

                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/authentication/login" element={<LoginPage />}></Route>
                    <Route path="/authentication/register" element={<RegisterPage />}></Route>
                    <Route path="/catalog/life-style" element={<ProductCategoriesPage />}></Route>
                    <Route
                        path="/catalog/product-list/:category"
                        element={<ProductListPage />}
                    ></Route>
                    <Route path="/catalog/search" element={<SearchPage />}></Route>
                    <Route path="/catalog/product/:id" element={<ProductPage />}></Route>
                </Routes>

                <div className={style.wrapper}>
                    <div className={style.content}></div>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
