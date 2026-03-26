import { NavLink, useLocation } from 'react-router';
import styles from './Menu.module.scss'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Menu() {
  const { pathname } = useLocation();
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    if (containerRef.current) {
      const activeLink: HTMLElement | null = containerRef.current.querySelector('a.active');
      if (activeLink && lineRef.current) {
        const w = activeLink.clientWidth;
        const x = activeLink.offsetLeft;
        gsap.timeline()
          .to(lineRef.current, { duration: 0.2, width: w * 0.2, ease: 'power3.out'}, 0)
          .to(lineRef.current, { duration: 0.25, width: w, ease: 'back.out' })
          .to(lineRef.current, { duration: 0.45, x: x, ease: 'back.out' }, 0);
      }
    }
  }, { dependencies: [pathname, lineRef, containerRef]})

  /* useEffect(() => {
    console.log('Menu', pathname, containerRef);
  }, [pathname, containerRef]); */

  useEffect(() => {
    const handleResize = () => {
        
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/portfolio" 
              /* ref={linkRefCallback} */
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about"
              /* ref={linkRefCallback} */
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact"
              /* ref={linkRefCallback} */
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div ref={lineRef} className={styles.line}></div>
      </nav>
    </div>
  )
}