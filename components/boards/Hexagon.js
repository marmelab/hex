import * as React from "react";

function Hexagon(props) {
  return (
    <svg
      viewBox="0 0 168.77689 194.88675"
      {...props}
      style={{
        position: "absolute",
        cursor: "pointer",
        ...props.style
      }}
    >
      <polygon
        fill={props.color}
        stroke="#2f404d"
        strokeWidth={10}
        points="52,16.861561 148,16.861561 196,100 148,183.13844 52,183.13844 4,100 "
        transform="rotate(-90,90.915907,106.52747)"
      />
    </svg>
  );
}

export default Hexagon;
