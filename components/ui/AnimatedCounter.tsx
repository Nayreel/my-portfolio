"use client";

import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1200 }: AnimatedCounterProps) {
  // Extract number and suffix (e.g. "9+" -> number: 9, suffix: "+", "3+ Yrs" -> 3, "+ Yrs")
  const match = value.match(/^(\d+)(.*)$/);

  const targetNumber = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(targetNumber !== null ? 0 : value);

  useEffect(() => {
    if (targetNumber === null) {
      setCount(value);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * targetNumber);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(targetNumber);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [targetNumber, duration, value]);

  if (targetNumber === null) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
