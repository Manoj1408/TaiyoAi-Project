import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import WorldData from "./WorldData";
import LineChart from "./LineChart";
import Loader from "./Loader";

export default function Map() {
  // const [casesData, setCasesData] = useState(null);
  const [countriesData, setCountriesData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [chartData, setChartData] = useState({});
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
        // console.log(response.data);
        setTotalData(response.data);
        setIsLoading1(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const countriesData = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(countriesData.data);
      setCountriesData(countriesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading2(false); // This line will execute regardless of success or error
    }

    try {
      let casesData = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      // console.log(casesData.data);
      const { cases, deaths, recovered } = casesData.data;
      // console.log(cases);
      setChartData({
        labels: Object.keys(cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(cases),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgba(58, 128, 233,0.1)",
            borderColor: "#3a80e9",
            pointRadius: 0,
          },
          {
            label: "Deaths",
            data: Object.values(deaths),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgba(255, 0, 0,0.1)",
            borderColor: "#FF0000",
            pointRadius: 0,
          },
          {
            label: "Recovered",
            data: Object.values(recovered),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgba(0, 255, 255,0.9)",
            borderColor: "#00FFFF",
            pointRadius: 0,
          },
        ],
      });
      setIsLoading3(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }


    
  };

  return (
    <>
      <div className="chart">
        <h1>COVID-19 Dashboard</h1>
        <div>
          <h3>World wide data of COVID-19 cases</h3>
          {isLoading1 ? (
            <Loader color="success" />
          ) : (
            <>
              <table>
                <tbody>
                  {Object.keys(totalData).map((key, index) => (
                    <tr key={key}>
                      <th>{key.toUpperCase()}</th>
                      <td>{totalData[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div>
          {isLoading2 ? (
            <Loader color="secondary" />
          ) : (
            <WorldData countriesData={countriesData} />
          )}
        </div>
        <div>
          <h3>Graph data for cases with date:</h3>
          {isLoading3 ? <Loader /> : <LineChart chartData={chartData} />}
        </div>
      </div>
    </>
  );
}
