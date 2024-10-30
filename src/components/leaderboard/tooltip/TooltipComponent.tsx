import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import './tooltip.css';

export const TooltipComponent = () => {
  const [tiltLeft, setTiltLeft] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiltLeft(prevMoveLeft => !prevMoveLeft);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Leaderboard is based in user's best game stats of LAST FIVE games only."
        data-tooltip-place="top"
        style={{ fontSize: '1.5em', display: 'inline-block', cursor: 'pointer' }}
        className={tiltLeft ? 'tilt-left' : 'tilt-right'}
      >
        ⛄
      </a>

      <Tooltip id="my-tooltip" />
    </>
  );
}
