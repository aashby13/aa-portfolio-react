import { useState } from 'react';
import ToolTip from '../ToolTip/ToolTip';
import styles from './VideoProgress.module.scss';
import { toTimecode } from '../../lib/util.functions';
import type { Position } from '../../lib/types';

interface IProps {
  currentTime: number;
  duration: number;
  buffer: number;
  onClickedCB: (time: number) => void
}

export default function Progress({ currentTime, duration, buffer, onClickedCB }: IProps) {
  const [ tipPosition, setTipPosition ] = useState<Position>({ left: 0});
  const [ tipText, setTipText ] = useState('0:00');
  const [ showTip, setShowTip ] = useState(false);

  const onPointerOver = () => {
    setShowTip(true);
  }

  const onPointerLeave = () => {
    setShowTip(false);
  }

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const { width, x, top } = (e.target as HTMLElement).getBoundingClientRect();
    setTipText(toTimecode(((e.clientX - x) / width) * duration));
    setTipPosition({ top, left: e.clientX });
  }

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const { width, x } = (e.target as HTMLElement).getBoundingClientRect();
    onClickedCB(((e.clientX - x) / width) * duration);
  }

  return (
    <div id="video-progress" className={styles.container}>
      <div className={styles.timeline} 
        onPointerEnter={onPointerOver}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div 
          className={styles.buffer} 
          style={{width: `${(buffer / duration )* 100}%`}}
        >
        </div>

        <div 
          className={styles.progress} 
          style={{width: `${(currentTime / duration )* 100}%`}}
        >
        </div>
      </div>
      <ToolTip text={tipText} show={showTip} position={tipPosition} />
    </div>
  )
}