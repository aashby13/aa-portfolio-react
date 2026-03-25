import type { ProjectData } from '../../lib/types';
import { useEffect } from 'react';
import styles from './PlayerLaunchBtn.module.scss'

interface PlayerLaunchBtnProps {
  projects: ProjectData[]
}

export default function PlayerLaunchBtn({ projects }: PlayerLaunchBtnProps) {
  
  useEffect(() => {
    console.log('PlayerLaunchBtn projects', projects);
  }, [projects]);

  useEffect(() => {
    console.info('PlayerLaunchBtn mount');
  }, []);

  return (
    <div className={styles.container}>
      
    </div>
  )
}