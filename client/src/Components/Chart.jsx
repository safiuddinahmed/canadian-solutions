import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

const Chart = () => {
  const dateArray = {};

  const visits = [5, 15, 12, 20, 9, 17, 12];

  for (var i = 1; i <= 7; i++) {
    dateArray[i] = moment().subtract(i, "days").format("LL");
  }

  let newDates = Object.keys(dateArray)
    .map((k) => dateArray[k])
    .reverse();

  const impressions = {
    labels: newDates,
    datasets: [
      {
        label: "Number of impressions generated on this day",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#00796b",
        data: visits,
      },
    ],
  };

  const optionsImpressions = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number of impressions generated",
            fontSize: 16,
            fontColor: "black",
          },
          ticks: {
            fontColor: "#37474f",
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Dates",
            fontSize: 16,
            fontColor: "black",
          },
          ticks: {
            fontColor: "#37474f",
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line
        options={optionsImpressions}
        label="false"
        useRef="chart"
        data={impressions}
      />
    </div>
  );
};

export default Chart;
