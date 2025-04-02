import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [isActive, setIsActive] = useState(false); // Timer active state
  const [seconds, setSeconds] = useState(1500); // Initial time in seconds (25 minutes)
  const [isPaused, setIsPaused] = useState(false); // Whether the timer is paused

  // Start/Pause Timer
  const startPauseTimer = () => {
    setIsActive(!isActive);
    setIsPaused(false);
  };

  // Reset Timer
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(1500); // Reset to 25 minutes
  };

  // Timer effect: Updates the countdown every second when active
  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // If the timer runs out, automatically stop it
    if (seconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval when timer is paused or reset
  }, [isActive, seconds, isPaused]);

  // Format time in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="pomodoro">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <p>{formatTime(seconds)}</p>

        <div className="buttons">
          {/* Start or Pause Button */}
          <button onClick={startPauseTimer}>
            {isActive && !isPaused ? 'Pause' : 'Start'}
          </button>

          {/* Reset Button */}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
