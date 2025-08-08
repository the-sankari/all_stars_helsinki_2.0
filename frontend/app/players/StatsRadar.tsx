"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PlayerStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  cleanSheets?: number;
  saves?: number;
}

export default function StatsRadar({ stats }: { stats: PlayerStats }) {
  const data = {
    labels: ["Games", "Goals", "Assists", "Minutes", "Yellows", "Reds"],
    datasets: [
      {
        label: "Player Performance",
        data: [
          stats.gamesPlayed,
          stats.goals,
          stats.assists,
          stats.minutesPlayed / 90,
          stats.yellowCards,
          stats.redCards,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax:
          Math.max(
            stats.gamesPlayed,
            stats.goals,
            stats.assists,
            stats.minutesPlayed / 90,
            stats.yellowCards,
            stats.redCards
          ) + 2,
      },
    },
  };

  return <Radar data={data} options={options} />;
}
