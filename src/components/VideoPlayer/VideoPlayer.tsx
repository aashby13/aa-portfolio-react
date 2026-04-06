import { useCallback, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import PlayPauseBtn from '../PlayPauseBtn/PlayPauseBtn';

interface IProps {
  src?: string
}

export default function VideoPlayer({ src }: IProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ paused, setPaused ] = useState(true);

  const onClickCB = useCallback(() => {
    if (ref.current) {
      if (ref.current.paused) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [])

  return (
    <div  className={styles.container}>
      <video 
        autoPlay
        ref={ref} 
        src={src} 
        onPlaying={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
      </video>

      <PlayPauseBtn 
        paused={paused} 
        onClickCB={onClickCB} 
      />
    </div>
  )
}