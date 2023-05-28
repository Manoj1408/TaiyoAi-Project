import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css'

export default function Map() {
  const [casesData, setCasesData] = useState(null);
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [worldData, countriesData] = await Promise.all([
        axios.get("https://disease.sh/v3/covid-19/all"),
        axios.get("https://disease.sh/v3/covid-19/countries"),
      ]);

      setCasesData(worldData.data);
      setCountriesData(countriesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderLineGraph = () => {
    if (!casesData || !casesData.timeline) {
      return null;
    }

    const { cases, deaths, recovered } = casesData.timeline;

    const data = {
      labels: Object.keys(cases),
      datasets: [
        {
          label: "Cases",
          data: Object.values(cases),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Deaths",
          data: Object.values(deaths),
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
        {
          label: "Recovered",
          data: Object.values(recovered),
          fill: false,
          borderColor: "rgb(54, 162, 235)",
          tension: 0.1,
        },
      ],
    };

    return <Line data={data} />;
  };

  const renderMap = () => {
    return (
      <MapContainer style={{ height: "400px" }} center={[0, 0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {countriesData.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
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
        ))}
      </MapContainer>
    );
  };

  return (
    <>
      <div className="mmain">
        <h2>COVID-19 Dashboard</h2>
        <p>Click on the particular country to show the status</p>
        {renderLineGraph()}
        {countriesData.length > 0 && renderMap()}
      </div>
    </>
  );
}
