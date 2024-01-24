import React from 'react';
import { calculateMean, calculateMedian, calculateMode } from '../utils/utils';

interface TableProps {
  measure: string;
  stats: Record<string, number[]>;
}

const Table: React.FC<TableProps> = ({ measure, stats }) => {
  const classNames = Object.keys(stats);

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classNames.map((className) => (
            <th key={className}>Class {className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{measure} - Mean</td>
          {classNames.map((className) => (
            <td key={className}>{calculateMean(stats[className]).toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>{measure} - Median</td>
          {classNames.map((className) => (
            <td key={className}>{calculateMedian(stats[className]).toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>{measure} - Mode</td>
          {classNames.map((className) => (
            <td key={className}>{calculateMode(stats[className]).toFixed(3)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
