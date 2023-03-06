import { useReducer, useState } from 'react';

import Button from '@components/Button';
import { showNotification } from '@services/NotificationService';
import Settings from './Settings';

const NORIFY_PERIOD = 300000;

function Dashboard() {
  const [precentageToNotify, setPrecentageToNotify] = useState<number>(0);
  const [time, updateTime] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      seconds: new Date().getSeconds(),
      minutes: new Date().getMinutes(),
      hours: new Date().getHours(),
    }
  );

  const getTimeDiff = () => {
    let lastNotify = localStorage.getItem('lastNotify')
      ? new Date(localStorage.getItem('lastNotify'))
      : null;
    if (!lastNotify) {
      localStorage.setItem('lastNotify', time.date.toString());
      lastNotify = new Date();
    }
    return new Date().getTime() - lastNotify.getTime();
  };

  const [timerId, setTimerId] = useState<number | null>(null);

  function handleStart() {
    const interval = setInterval(() => {
      if (getTimeDiff() > NORIFY_PERIOD) {
        localStorage.setItem('lastNotify', new Date().toString());
        showNotification({ title: 'Hello', body: 'xdddddd' });
      }

      const precentage = Math.trunc((getTimeDiff() / NORIFY_PERIOD) * 100);

      document.documentElement.style.setProperty(
        '--precentageHeight',
        `${precentage}vh`
      );

      setPrecentageToNotify(precentage);
      updateTime({
        seconds: new Date().getSeconds(),
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
      });
    }, 1000);
    setTimerId(interval);
  }

  function handleStop() {
    if (!timerId) return;
    clearInterval(timerId);
  }

  return (
    <>
      <Settings />
      <div>
        <div className="">
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handleStop}>Stop</Button>
          <button type="button">xd</button>
        </div>
        <p>
          <span>{time.hours}:</span>
          <span>{time.minutes}:</span>
          <span>{time.seconds}</span>
        </p>
        <p>{precentageToNotify}% - 100%</p>
      </div>
    </>
  );
}
export default Dashboard;
