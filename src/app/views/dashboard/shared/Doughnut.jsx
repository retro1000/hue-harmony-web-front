import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";

export default function DoughnutChart({
  height = "50%",
  color = [],
  position = "left",
}) {
  const theme = useTheme();

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    series: [
      {
        name: "Traffic Rate",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center",
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: "roboto",
            },
            formatter: "{a}",
          },
          emphasis: {
            show: true,
            textStyle: { fontSize: "14", fontWeight: "normal" },
            formatter: "{b} \n{c} ({d}%)",
          },
        },
        labelLine: { normal: { show: false } },
        data: [
          { value: 65, name: "DULUX" },
          { value: 20, name: "Asian Paint" },
          { value: 15, name: "JAT" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "50%", // Half the screen width
        margin: "0", // Remove extra margin
        marginLeft: position === "left" ? "0" : "auto", // Align left or right based on prop
        marginRight: position === "right" ? "0" : "auto", // Opposite of left alignment
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // Beautiful drop shadow
        borderRadius: "8px", // Optional, to make edges rounded
        padding: "16px", // Optional, for spacing around the chart
        backgroundColor: theme.palette.background.paper, // Optional, matching background
      }}
    >
      <ReactEcharts
        style={{ height: height, width: "100%" }}
        option={{ ...option, color: [...color] }}
      />
    </div>
  );
}
