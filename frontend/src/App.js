import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Fundraiser from "@/pages/Fundraiser";
import Admin from "@/pages/Admin";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Fundraiser />} />
                    <Route path="/adicionar-contribuicao" element={<Admin />} />
                </Routes>
            </BrowserRouter>
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
