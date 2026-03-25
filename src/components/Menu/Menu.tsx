import { NavLink } from 'react-router';
import styles from './Menu.module.scss'

export default function Menu() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><NavLink to="/portfolio">Portfolio</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <div className="line"></div>
    </nav>
  )
}