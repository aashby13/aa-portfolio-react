import { NavLink } from 'react-router';
import type { ProjectData } from '../../lib/types';
import { useEffect } from 'react';
import styles from './DotNav.module.scss'

interface DotNavProps {
  projects: ProjectData[]
}

export default function DotNav({ projects }: DotNavProps) {
  
  useEffect(() => {
    console.log('DotNav projects', projects);
  }, [projects]);

  useEffect(() => {
    console.info('DotNav mount');
  }, []);

  return (
    <nav className={styles.nav}>
      {
        projects.map(p => (
          <NavLink
            className={styles.dot}
            key={p.id}
            to={`portfolio/${p.id}`} 
            title={`go to ${p.name}`}
            aria-label={`go to ${p.name}`}
            ></NavLink>
        ))
      }
    </nav>
  )
}