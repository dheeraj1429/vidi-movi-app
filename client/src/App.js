import { Routes, Route } from "react-router";

// components
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";

// pages
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <div className="App">
            <NavbarComponent />

            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
