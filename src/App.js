import style from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/home_page/HomePage";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />

                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
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
