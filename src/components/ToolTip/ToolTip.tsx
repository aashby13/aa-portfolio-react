import type { Position } from '../../lib/types';
import styles from './ToolTip.module.scss';

interface IProps {
  text: string;
  show: boolean;
  position?: Position
}

export default function ToolTip({ text, show, position }: IProps) {

  return (
    <div 
      data-tooltip
      className={styles.toolTip} 
      style={position}
      data-show={show}
      >
      <span>{ text }</span>
    </div>
  )
}