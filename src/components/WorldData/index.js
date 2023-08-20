import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import axios from "axios";
import L from "leaflet";

function WorldData({countriesData }) {
  // Placeholder data and function
  //const countriesData = []; // Replace with your COVID-19 data array
  //const renderLineGraph = () => {}; // Define or import your line graph rendering function

  // const [countriesData, setCountriesData] = useState([]);

  // useEffect(() => {
  //   console.log("useEffect in WorldData is executed");
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const countriesData = await axios.get(
  //       "https://disease.sh/v3/covid-19/countries"
  //     );
  //     console.log(countriesData.data);
  //     setCountriesData(countriesData.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsLoading2(false); // This line will execute regardless of success or error
  //   }
  // };

  const renderMap = () => {
    return (
      <MapContainer
        style={{ height: "600px", width: "80vw" }}
        center={[0, 0]}
        zoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {countriesData.map((country) => {
          const lat = country.countryInfo.lat;
          const long = country.countryInfo.long;
          // const flagUrl = country.countryInfo.flag;

          // Use a custom marker icon
          const markerIcon = new L.divIcon({
            className: "custom-marker-icon",
            html: `<div>${country.countryInfo.iso3}</div>`, // Use iso3 as the content
          });

          return (
            <Marker
              key={country.country}
              position={[lat, long]}
              icon={markerIcon}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Total Active Cases: {country.active}</p>
                  <p>Total Recovered: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  };

  return (
    <>
      <h3>Country Specific data of COVID-19 cases:</h3>
      <p>Click on the particular country to show the status</p>
      <div className="worldmap">{countriesData.length > 0 && renderMap()}</div>
    </>
  );
}

export default WorldData;
