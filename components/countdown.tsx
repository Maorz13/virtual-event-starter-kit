import { useEffect, useState } from 'react';
import { EVENT_START } from '@lib/constants';
import styles from './hero.module.css';

const UNITS: [string, number][] = [
  ['Days', 86400000],
  ['Hours', 3600000],
  ['Minutes', 60000],
  ['Seconds', 1000]
];

export default function Countdown() {
  // Starts null so the server render and first client render match
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, Date.parse(EVENT_START) - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === 0) return null;

  let left = remaining ?? 0;
  return (
    <div className={styles.countdown} aria-label="Time until the conference starts">
      {UNITS.map(([label, ms]) => {
        const value = Math.floor(left / ms);
        left -= value * ms;
        return (
          <div key={label}>
            <div className={styles['countdown-value']}>
              {remaining === null ? '--' : String(value).padStart(2, '0')}
            </div>
            <div className={styles['countdown-label']}>{label}</div>
          </div>
        );
      })}
    </div>
  );
}
