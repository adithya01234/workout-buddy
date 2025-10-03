import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages&components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { WorkoutsContextprovider } from "./context/WorkoutContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WorkoutsContextprovider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </WorkoutsContextprovider>
      </BrowserRouter>
    </div>
  );
}

export default App;
