import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Contacts from './components/Contacts';
import { Routes, Route } from "react-router-dom";
import Map from './components/Map'
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="main">
        <Header />
        <div className="sidebar">
          <Sidebar />

          <Routes>
            <Route path="/TaiyoAi-Project/" element={<Contacts />}></Route>
            <Route path="/TaiyoAi-Project/map" element={<Map />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
