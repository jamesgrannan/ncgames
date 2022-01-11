import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Games from "./components/Games";
import Review from "./components/Review";
import Username from "./components/Username";
import { useContext, useState } from "react";
import { userContext } from "./contexts/user";

function App() {
  const [user, setUser] = useState("jessjelly");
  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/games" element={<Games />} />
            <Route path="/review" element={<Review />} />
            <Route path="/users/:username" element={<Username />} />
          </Routes>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
