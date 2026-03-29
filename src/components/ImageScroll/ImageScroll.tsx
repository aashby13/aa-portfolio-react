import type { ProjectData } from '../../lib/types';
import { useEffect, useRef } from 'react';
import styles from './ImageScroll.module.scss'

interface IProps {
  projects: ProjectData[]
}

export default function ImageScroll({ projects }: IProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseWheel = (e: WheelEvent) => {
      console.log(e);
      if (e.target !== container.current) {
        container.current?.scrollTo({ top: container.current.scrollTop + (e.deltaY * 6), behavior: 'smooth'})
      }
    }
    window.addEventListener('wheel', onMouseWheel);
    return () => {
      window.removeEventListener('wheel', onMouseWheel);
    }
  }, []);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.imageHolder}>
        {
          projects.map(p => (
            <div 
              key={`img-${p.id}`}
              id={p.id}
              className={styles.image}
            >
            </div>
          ))
        }
      </div>
    </div>
  )
}