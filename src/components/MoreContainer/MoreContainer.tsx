import type { ProjectJsonData } from '../../lib/types';
import styles from './MoreContainer.module.scss'
import { useOutletContext } from 'react-router';


export default function MoreContainer() {
  const { projects, roles, types } = useOutletContext<ProjectJsonData>();

  return (
    <div className={styles.container}>
      
    </div>
  )
}