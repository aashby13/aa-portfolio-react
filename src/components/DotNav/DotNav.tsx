import { NavLink, useMatch } from 'react-router';
import type { ProjectData } from '../../lib/types';
import styles from './DotNav.module.scss'

interface IProps {
  projects: ProjectData[]
}

export default function DotNav({ projects }: IProps) {
  const match = useMatch('/portfolio/:pid/more');
  
  return (
    <nav className={styles.nav}>
      {
        projects.map(p => (
          <NavLink
            className={styles.dot}
            key={p.id}
            to={`/portfolio/${p.id}${match ? '/more' : ''}`} 
            title={`go to ${p.name}`}
            aria-label={`go to ${p.name}`}
            ></NavLink>
        ))
      }
    </nav>
  )
}