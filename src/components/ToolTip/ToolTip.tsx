import styles from './ToolTip.module.scss';

interface IProps {
  text: string;
  show: boolean;
  position: { top: number, left: number }
}

export default function ToolTip({ text, show, position }: IProps) {

  return (
    <div 
      className={styles.toolTip} 
      style={position}
      data-show={show}
      >
      <span>{ text }</span>
    </div>
  )
}