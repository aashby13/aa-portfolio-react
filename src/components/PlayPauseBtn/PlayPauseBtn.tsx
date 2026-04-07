import './PlayPauseBtn.scss'

interface IProps {
  paused: boolean;
  onClickCB: () => void
}

export default function PlayPauseBtn({ paused, onClickCB }: IProps) {
  return (
    <button id="play-pause-btn" className="play-pause-btn" onClick={onClickCB}>
      <div 
        className={`play-toggle ${ paused ? 'paused' : '' }`}
        data-show={paused}
      >
        <span></span>
      </div>
    </button>
  )
}