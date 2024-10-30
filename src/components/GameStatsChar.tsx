import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";

interface Props {
  correct: number;
  incorrect: number;
  missing: number;
}

export const GameStatsChart = ({
  correct,
  incorrect,
  missing,
}: Props) => {
  const [chartSize, setChartSize] = useState<{width: number, height: number}>({ width: 350, height: 150 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth * 0.9;
      const height = width * 0.5;
      setChartSize({ width: Math.min(width, 350), height: Math.min(height, 150) });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: correct, label: "correct", color: "blue" },
            { id: 1, value: incorrect, label: "incorrect", color: "orange" },
            { id: 2, value: missing, label: "missing", color: "gray" },
          ],
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={chartSize.width}
      height={chartSize.height}
    />
  );
};
