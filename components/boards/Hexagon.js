import * as React from "react";

function Hexagon(props) {
  return (
    <svg
      viewBox="0 0 200 200"
      {...props}
      style={{
        position: "absolute",
        height: props.proportion,
        width: props.proportion,
        left: props.left,
        top: props.top,
        cursor: "pointer"
      }}
    >
      <path
        d="M1.25 145.443v-96l83.138-48 83.139 48v96l-83.139 48z"
        fill={props.color}
        stroke="#2f404d"
        strokeWidth={10}
      />{" "}
    </svg>
  );
}

export default Hexagon;
