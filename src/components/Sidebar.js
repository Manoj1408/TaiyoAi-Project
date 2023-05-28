import React from 'react';
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    return (
      <>
        <div className="smain">
          <h1>Taiyo.Ai</h1>
          <div className="sidebar">
            <NavLink to="/TaiyoAi-Project/">Contact</NavLink>
            <NavLink to="/TaiyoAi-Project/map">Charts and Maps</NavLink>
          </div>
        </div>
      </>
    );
}
