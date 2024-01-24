// WineStats.tsx
// Exporting the utility functions and custom hooks

import React from "react";
import {
  useCalculateClassWiseStats,
  useCalculateClassWiseGamma,
} from "../utils/utils";
import Table from "./Table";
export interface WineData {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number;
  "Nonflavanoid phenols": number;
  Proanthocyanins: string | number;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number;
  Unknown: number;
  [key: number]: number; // Add an index signature
}
interface WineStatsProps {
  wineData: WineData[];
}
// WineStats.tsx

const WineStats: React.FC<WineStatsProps> = ({ wineData }) => {
  // this are custom hooks for calculating class-wise statistics for Flavanoids and Gamma

  const calculateFlavanoidsStats = useCalculateClassWiseStats();
  const calculateGammaStats = useCalculateClassWiseGamma();

  //  it calculates class-wise statistics for the 'Flavanoids' property based on the classes defined by the 'Alcohol' property in the given wineData array.
  const flavanoidsStats = calculateFlavanoidsStats(
    wineData,
    "Flavanoids",
    "Alcohol"
  );

  // it calculate class-wise statistics for Gamma
  const gammaStats = calculateGammaStats(
    wineData,
    "Ash",
    "Hue",
    "Magnesium",
    "Alcohol"
  );

  return (
    <div>
      <h2>Flavanoids Statistics</h2>
      {<Table measure="Flavanoids" stats={flavanoidsStats} />}
      <h2>Gamma Statistics</h2>
      {<Table measure="Gamma" stats={gammaStats} />}
    </div>
  );
};
// Function to render the statistics table

export default WineStats;
