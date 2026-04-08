import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import PlayPauseBtn from '../PlayPauseBtn/PlayPauseBtn';
import VideoProgress from '../VideoProgress/VideoProgress';
import Button from '../Button/Button';

interface IProps {
  src?: string
}

export default function VideoPlayer({ src }: IProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ prevSrc, setPrevSrc] = useState<string>();
  const [ paused, setPaused ] = useState(true);
  const [ duration, setDuration ] = useState(0);
  const [ currentTime, setCurrentTime ] = useState(0);
  const [ buffer, setBuffer ] = useState(0);
  const [ speed, setSpeed ] = useState('1.0');

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
    if (ref.current && ref.current.buffered.length) {
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
      setPrevSrc(src);
      setDuration(ref.current.duration);
      onProgress();
      updatePlaybackSpeed(1);
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

  const openFullscreen = useCallback(() => {
    if (ref.current?.requestFullscreen) {
      ref.current?.requestFullscreen();
      // @ts-expect-error property webkitRequestFullscreen does not exist on type
    } else if (ref.current?.webkitRequestFullscreen) { /* Safari */
      // @ts-expect-error property webkitRequestFullscreen does not exist on type
      ref.current?.webkitRequestFullscreen();
    }
  }, [])

  const updatePlaybackSpeed = useCallback((rate?: number) => {
    if (ref.current) {
      let s = rate || ref.current.playbackRate + 0.5;
      if (s > 3 || s < 1) s = 1;
      setSpeed(s.toFixed(1));
      ref.current.playbackRate = s;
    }
  }, [setSpeed])

  useEffect(() => {
    const onResize = () => {
      if (ref.current) {
        ref.current.playsInline = window.innerWidth >= 1024;
      }
    }
    // in case user changes speed in fullscreen
    const onFSChange = () => {
      if (ref.current) {
        updatePlaybackSpeed(ref.current.playbackRate);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('fullscreenchange', onFSChange);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('fullscreenchange', onFSChange);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div  className={styles.container} data-show={ src === prevSrc }>
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

      <div className={styles.controls}>
        <VideoProgress 
          currentTime={currentTime}
          duration={duration}
          buffer={buffer}
          onClickedCB={onProgessClicked}
        />

        <Button onClick={() => updatePlaybackSpeed()} attr={{ title: 'playback speed' }}>
          <span data-times>x</span>{ speed }
        </Button>

        <Button onClick={openFullscreen} attr={{ title: 'fullscreen' }}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M12.86,17.73l-7.4,7.4V21.89a1,1,0,0,0-2,0v5.64s0,.05,0,.08a1,1,0,0,0,.2.54,1,1,0,0,0,.14.15,1,1,0,0,0,.65.24h5.65a1,1,0,0,0,0-2H6.87l7.4-7.4a1,1,0,0,0-1.41-1.41Z"/>
              <path d="M28.3,3.81a1,1,0,0,0-.15-.14,1,1,0,0,0-.54-.2H21.89a1,1,0,0,0,0,2h3.23l-7.4,7.4a1,1,0,1,0,1.41,1.41l7.4-7.4v3.23a1,1,0,0,0,2,0V4.46h0A1,1,0,0,0,28.3,3.81Z"/>
              <path d="M27.54,20.89a1,1,0,0,0-1,1v3.23l-7.4-7.4a1,1,0,0,0-1.41,1.41l7.4,7.4H21.89a1,1,0,0,0,0,2h5.65a1,1,0,0,0,.65-.24,1,1,0,0,0,.14-.15,1,1,0,0,0,.2-.54s0-.05,0-.08V21.89A1,1,0,0,0,27.54,20.89Z"/>
              <path d="M6.87,5.46h3.23a1,1,0,0,0,0-2H4.46a1,1,0,0,0-.65.24,1,1,0,0,0-.14.15,1,1,0,0,0-.2.54s0,.05,0,.08v5.64a1,1,0,0,0,2,0V6.87l7.4,7.4a1,1,0,0,0,1.41-1.41Z"/>
            </g>
          </svg>
        </Button>
      </div>

      
    </div>
  )
}