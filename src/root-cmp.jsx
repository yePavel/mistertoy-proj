import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import { AppHeader } from "./cmp/AppHeader.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";

// import './assets/style/main.css'
import { ToysDashBoard } from "./pages/ToysDashboard.jsx";
import { UserLogin } from "./pages/UserLogin.jsx";
import { UserDetails } from "./pages/UserDetails.jsx";
import { ReviewIndex } from "./pages/ReviewIndex.jsx";

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className="main-layout">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit/" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToysDashBoard />} path="/toy/dashboard" />
                            <Route element={<UserDetails />} path="/userDetails" />
                            <Route element={<ReviewIndex />} path="/review" />
                            <Route element={<UserLogin />} path="/login" />
                            {/* <Route element={<ToysDashBoard />} path="/signup" /> */}
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>

    )
}