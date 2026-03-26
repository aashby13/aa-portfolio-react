import { NavLink, useLocation } from 'react-router';
import styles from './Menu.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Menu() {
  const { pathname } = useLocation();
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [resizeCount, setResizeCount] = useState(0);

  const getWidthX = useCallback((): { width: number, x: number } => {
    const data = { width: 0, x: 0 };
    if (containerRef.current) {
      const activeLink: HTMLElement | null = containerRef.current.querySelector('a.active');
      if (activeLink && lineRef.current) {
        data.width = activeLink.clientWidth;
        data.x = activeLink.offsetLeft;
      }
    }
    return data;
  }, [containerRef])

  useGSAP(() => {
    const { width, x } = getWidthX();
    if (width && lineRef.current) {
      gsap.timeline()
        .to(lineRef.current, { duration: 0.2, width: width * 0.2, ease: 'power3.out'}, 0)
        .to(lineRef.current, { duration: 0.25, width, ease: 'back.out' })
        .to(lineRef.current, { duration: 0.45, x, ease: 'back.out' }, 0);
    }
  }, { dependencies: [pathname, lineRef, getWidthX]});

  useGSAP(() => {
    if (resizeCount) {
      const { width, x } = getWidthX();
      if (width && lineRef.current) {
        gsap.set(lineRef.current, { width, x});
      }
    }
    
  }, { dependencies: [resizeCount]});

  useEffect(() => {
    const handleResize = () => {
      setResizeCount(prev => prev + 1);
    }
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
            <NavLink to="/portfolio">
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>

        <div ref={lineRef} className={styles.line}></div>
      </nav>
    </div>
  )
}