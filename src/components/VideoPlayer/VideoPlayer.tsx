import { useCallback, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import PlayPauseBtn from '../PlayPauseBtn/PlayPauseBtn';
import VideoProgress from '../VideoProgress/VideoProgress';

interface IProps {
  src?: string
}

export default function VideoPlayer({ src }: IProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ paused, setPaused ] = useState(true);
  const [ duration, setDuration ] = useState(0);
  const [ currentTime, setCurrentTime ] = useState(0);
  const [ buffer, setBuffer ] = useState(0);

  const onClickCB = useCallback(() => {
    if (ref.current) {
      if (ref.current.paused) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [])

  const onProgress = () => {
    if (ref.current) {
      let buf = ref.current.buffered.end(ref.current.buffered.length - 1) || 0;
      /* Some Androids don't return a buffered range
      fake buffer when no buffered range is returned */
      if (!buf && ref.current.currentTime > 0) {
        buf = ref.current.currentTime + 2;
      }
      //
      setBuffer(buf);
    }
    
  }

  const onLoadedMetadata = () => {
    if(ref.current) {
      setDuration(ref.current.duration);
      onProgress();
    }
  }

  const onTimeUpdate = () => {
    if(ref.current) {
      setCurrentTime(ref.current.currentTime);
      onProgress();
    }
  }

  const onProgessClicked = useCallback((time: number) => {
    if(ref.current) {
      ref.current.currentTime = time;
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
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      >
      </video>

      <PlayPauseBtn 
        paused={paused} 
        onClickCB={onClickCB} 
      />

      <VideoProgress 
        currentTime={currentTime}
        duration={duration}
        buffer={buffer}
        onClickedCB={onProgessClicked}
      />
    </div>
  )
}