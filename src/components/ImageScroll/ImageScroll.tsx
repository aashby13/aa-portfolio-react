import type { ProjectData } from '../../lib/types';
import { useEffect } from 'react';
import styles from './ImageScroll.module.scss'

interface IProps {
  projects: ProjectData[]
}

export default function ImageScroll({ projects }: IProps) {
  
  useEffect(() => {
    console.log('ImageScroll projects', projects);
  }, [projects]);

  useEffect(() => {
    console.info('ImageScroll mount');
  }, []);

  return (
    <div className={styles.container}>
      
    </div>
  )
}