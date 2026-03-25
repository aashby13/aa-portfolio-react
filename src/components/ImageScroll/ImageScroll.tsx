import type { ProjectData } from '../../lib/types';
import { useEffect } from 'react';
import styles from './ImageScroll.module.scss'

interface ImageScrollProps {
  projects: ProjectData[]
}

export default function ImageScroll({ projects }: ImageScrollProps) {
  
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