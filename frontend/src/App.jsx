import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Fundraiser from "@/pages/Fundraiser";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Fundraiser />} />
                </Routes>
            </HashRouter>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#2C2621",
                        color: "#FDFBF7",
                        border: "1px solid #C85A17",
                        fontFamily: "Outfit, system-ui, sans-serif",
                    },
                }}
            />
        </div>
    );
}

export default App;
