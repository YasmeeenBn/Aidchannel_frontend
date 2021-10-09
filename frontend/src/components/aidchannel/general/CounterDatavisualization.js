import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CounterDatavisualization = ({
  bgColor,
  textColor,
  value,
  title,
  duration,
  route,
}) => {
  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = 0;
    // first three numbers from props
    const end = parseInt(value.substring(0, 3));
    // if zero, return
    if (start === end) return;

    // find duration per increment
    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    // timer increments start counter
    // then updates count
    // ends if start reaches end
    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + value.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    // dependency array
  }, [value, duration]);

  return (
    <Link to={route} className="text-decoration-none">
      <div
        className="d-flex p-5"
        style={{
          backgroundColor: bgColor,
          borderRadius: "19px",
          textAlign: "center",
        }}
      >
        <div className="m-auto my-4" style={{ color: textColor }}>
          <h4>{title}</h4>
          <h4>{count}</h4>
        </div>
      </div>
    </Link>
  );
};

export default CounterDatavisualization;
