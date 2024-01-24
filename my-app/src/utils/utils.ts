// utils.ts

import { WineData } from "../components/WineStats";
import { useMemo } from "react";

// Function to calculate the mean of an array of numbers

const calculateMean = (values: number[]): number => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};
// Function to calculate the median of an array of numbers

const calculateMedian = (values: number[]): number => {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
  } else {
    return sortedValues[mid];
  }
};
// Function to calculate the mode  of an array of numbers

const calculateMode = (values: number[]): number => {
  const counts: Record<number, number> = {};
  values.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  let mode: number | undefined;
  let maxCount = 0;
  for (const value in counts) {
    if (counts[value] > maxCount) {
      maxCount = counts[value];
      mode = Number(value);
    }
  }

  return mode!;
};
// Function to calculate gamma based on provided parameters
const calculateGamma = (ash: number, hue: number, magnesium: number): number => {
  return (ash * hue) / magnesium;
};
// Custom hook to calculate class-wise Flavanoids statistics 

const useCalculateClassWiseStats = (): ((data: WineData[], property: keyof WineData, classProperty: keyof WineData) => Record<string, number[]>) => {
  return useMemo(() => {
    return (data: WineData[], property: keyof WineData, classProperty: keyof WineData): Record<string, number[]> => {
      const classColumns: Record<string, number[]> = {};

      data.forEach((entry) => {
        const className = entry[classProperty].toString();
        const propertyValue = Number(entry[property]);

        if (!classColumns[className]) {
          classColumns[className] = [];
        }

        classColumns[className].push(propertyValue);
      });

      return classColumns;
    };
  }, []);
};
// Custom hook to calculate class-wise gamma for given properties

const useCalculateClassWiseGamma = (): ((data: WineData[], ashProperty: keyof WineData, hueProperty: keyof WineData, magnesiumProperty: keyof WineData, classProperty: keyof WineData) => Record<string, number[]>) => {
  return useMemo(() => {
    return (data: WineData[], ashProperty: keyof WineData, hueProperty: keyof WineData, magnesiumProperty: keyof WineData, classProperty: keyof WineData): Record<string, number[]> => {
      const classColumns: Record<string, number[]> = {};

      data.forEach((entry) => {
        const className = entry[classProperty].toString();
        const gammaValue = calculateGamma(
          Number(entry[ashProperty]),
          Number(entry[hueProperty]),
          Number(entry[magnesiumProperty])
        );

        if (!classColumns[className]) {
          classColumns[className] = [];
        }

        classColumns[className].push(gammaValue);
      });

      return classColumns;
    };
  }, []);
};

export {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateGamma,
  useCalculateClassWiseStats,
  useCalculateClassWiseGamma,
};
