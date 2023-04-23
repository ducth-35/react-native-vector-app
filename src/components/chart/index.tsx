import { SCREEN_WIDTH, scale } from "@/common/scale";
import React from "react";
import {
  Defs,
  Line,
  LinearGradient,
  Polygon,
  Polyline,
  Rect,
  Stop,
  Svg,
  Text,
} from "react-native-svg";
import { View } from "react-native";

const data = [
  { month: 1, score: 4 },
  { month: 2, score: 5 },
  { month: 3, score: 6 },
  { month: 4, score: 7 },
  { month: 5, score: 8 },
  { month: 6, score: 7 },
  { month: 7, score: 6 },
  { month: 8, score: 7 },
  { month: 9, score: 6 },
  { month: 10, score: 6 },
  { month: 11, score: 6 },
  { month: 12, score: 5 },
];

export const ChartKit = () => {
  // tính toán kích thước của biểu đồ
  const width = SCREEN_WIDTH;
  const height = 250;
  const margin = 30;
  const viewBox = `0 0 ${width + margin * 2} ${height + margin * 2}`;

  // tính toán tọa độ của các điểm trên biểu đồ
  const x = (month: any) => ((month - 1) / 11) * width + margin;
  const y = (score: any) => ((10 - score) / 9) * height + margin;

  // tạo chuỗi path cho đường
  const path = data
    .map(({ month, score }) => `${x(month)},${y(score)}`)
    .join(" ");

  // Tính toán tọa độ các điểm ở dưới cùng của biểu đồ
  const bottomLeft = `${margin},${height + margin}`;
  const bottomRight = `${width + margin},${height + margin}`;
  const bottomPoints = `${path} ${bottomRight} ${bottomLeft}`;

  const gradientId = "gradient";
  const gradient = (
    <Defs>
      <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor="#D6F2CF" stopOpacity={0.8} />
        <Stop offset="100%" stopColor="#00d520" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );
  return (
    <View style={{ marginTop: scale(20) }}>
      <Svg width={width} height={height} viewBox={viewBox}>
        {gradient}
        <Polygon points={bottomPoints} fill="url(#gradient)" />
        <Rect
          x={margin}
          y={margin}
          width={width}
          height={height}
          fill="transparent"
        />
        {/* Vẽ trục x */}
        <Line
          x1={margin}
          y1={margin}
          x2={margin}
          y2={height + margin}
          stroke="#e0e0e0"
          strokeWidth={0}
        />
        {/* Hiển thị các điểm trên trục x */}
        {data.map(
          ({ month, score }) =>
            month % 2 === 0 && (
              <Text
                key={month}
                x={margin - 25}
                y={y(month)}
                fontSize={10}
                fill="#999999"
                textAnchor="middle"
              >
                {month}đ
              </Text>
            )
        )}
        {/* Vẽ trục y */}
        <Line
          x1={margin}
          y1={height + margin}
          x2={width + margin}
          y2={height + margin}
          stroke="#e0e0e0"
          strokeWidth={1}
        />

        {/* Hiển thị các giá trị trên trục x */}
        {data.map(
          ({ month, score }) =>
            month % 2 === 0 && (
              <React.Fragment key={month}>
                <Text
                  key={month}
                  x={x(month) - 15}
                  y={height + margin + 25}
                  fontSize={12}
                  fill="#999999"
                  textAnchor="end"
                >
                  2022
                </Text>
                <Text
                  key={month}
                  x={x(month) - 15}
                  y={height + margin + 25}
                  fontSize={16}
                  fontWeight={"600"}
                  fill="#707070"
                  textAnchor="start"
                >
                  T{month}
                </Text>
              </React.Fragment>
            )
        )}
        <Polyline
          points={path}
          stroke="#00d520"
          strokeWidth={2.5}
          fill="none"
        />
      </Svg>
      {gradient}
    </View>
  );
};
