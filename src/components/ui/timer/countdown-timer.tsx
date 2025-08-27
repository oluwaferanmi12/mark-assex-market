import React, { useEffect, useRef, useState } from "react";

type TimerProps = {
  minutes: number;
  running: boolean; // parent controls start/stop
  resetKey?: any; // change to reset
  onComplete?: () => void;
  onTick?: (secondsLeft: number) => void; // optional: per-second callback
};

export const CountDownTimer: React.FC<TimerProps> = ({
  minutes,
  running,
  resetKey,
  onComplete,
  onTick,
}) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, Math.floor(minutes * 60))
  );
  const intervalRef = useRef<number | null>(null);

  // Reset when minutes or resetKey changes
  useEffect(() => {
    setTimeLeft(Math.max(0, Math.floor(minutes * 60)));
  }, [minutes, resetKey]);

  // Start/stop based on `running`
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    if (timeLeft <= 0) return; // already finished

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          // cleanup and complete
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          onTick?.(0);
          onComplete?.();
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running, timeLeft, onComplete, onTick]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <span className="text-xs font-work-sans-regular ml-1">
      {" " + formatTime(timeLeft)}
    </span>
  );
};
