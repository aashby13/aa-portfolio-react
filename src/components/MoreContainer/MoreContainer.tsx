import type { PortfolioOutletContextData } from '../../lib/types';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './MoreContainer.module.scss'
import { useOutletContext } from 'react-router';


export default function MoreContainer() {
  const { projects, pid } = useOutletContext<PortfolioOutletContextData>();
  const src = projects.find(p => p.id === pid)?.more.video;

  return (
    <div id="more-container" className={styles.container}>
        <VideoPlayer src={src} />
    </div>
  )
}