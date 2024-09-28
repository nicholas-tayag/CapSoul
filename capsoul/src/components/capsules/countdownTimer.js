import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ releaseDate, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerEndedRef = useRef(false); // Ref to keep track if the timer has ended

  function calculateTimeLeft() {
    const difference = new Date(releaseDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 &&
      !timerEndedRef.current // Ensure onTimerEnd only fires once
    ) {
      onTimerEnd();
      timerEndedRef.current = true; // Mark the timer as ended
    } else if (!timerEndedRef.current) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, onTimerEnd]);

  return (
    <div>
      {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      ) : (
        <span>Open Now!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
