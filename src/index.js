import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const API_KEY = "a35d5417a2732375f65ff0e5f05d9012";

function App() {
  const [points, setPoints] = useState([]);

  const fetchWeather = async () => {
    const city = "Hyderabad";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    setPoints(
      data.list.slice(0, 8).map((p) => ({
        t: p.dt_txt,
        v: p.main.temp
      }))
    );
  };

  return (
    <div>
      <h1>Weather Chart</h1>

      <button onClick={fetchWeather}>
        Load Weather
      </button>

      <Line
        data={{
          labels: points.map((p) => p.t),
          datasets: [
            {
              label: "Temperature",
              data: points.map((p) => p.v)
            }
          ]
        }}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);