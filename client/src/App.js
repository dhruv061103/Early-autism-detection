import { AppProvider } from "./components/context/appContext";
import Diagnose from "./components/diagnose/Diagnose";
import ResultPopUp from "./components/diagnose/ResultPopUp";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/Login";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./components/diagnose/Questions";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diagnose/yourself" element={<Diagnose />} />
            <Route path="/diagnose/questions/:person" element={<Questions />} />
            <Route
              path="/diagnose/questions/report"
              element={<ResultPopUp />}
            />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
