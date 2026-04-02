import type { ProjectData } from '../../lib/types';
import { useEffect, useRef, useState } from 'react';
import styles from './ImageScroll.module.scss'
import { href, useMatch, useNavigate, useParams } from 'react-router';
import { useDebounce } from 'use-debounce';
import { gsap, ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollToPlugin);

interface IProps {
  projects: ProjectData[]
}

export default function ImageScroll({ projects }: IProps) {
  const container = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const match = useMatch('/portfolio/:pid/more');
  const [ observe, setObserve ] = useState(true);
  const { pid } = useParams()
  const [ path, setPath ] = useState<string>();
  const [ newPath ] = useDebounce(path, 300);

  useGSAP(() => {
    if (pid && !newPath?.includes(pid)) {
      setPath(undefined);
      gsap.to(container.current, { 
        duration: 1.2, 
        scrollTo: `#${pid}`, 
        ease: 'power3.out',
        onStart: () => setObserve(false),
        onComplete: () => setObserve(true)
      });
    }
  }, { dependencies: [ pid ]})

  useEffect(() => {
    if (newPath) {
      navigate(newPath);
    }
  }, [newPath, navigate])
  
  useEffect(() => {
    /* console.log('useEffect: observer'); */
    let observer: IntersectionObserver;
    if (observe) {
      let skipFirst = true;
      const observerCB = (entries: IntersectionObserverEntry[]) => {
        if (skipFirst) {
          skipFirst = false;
        } else {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setPath(href(`/portfolio/:pid${match ? 'more' : ''}`, { pid: entry.target.id }))
            }
          });
        }
      }
      observer = new IntersectionObserver(observerCB, { root: container.current, threshold: 0.99 });
      imageRefs.current.forEach(el => {
        observer.observe(el);
      });
    }
    return () => {
      observer?.disconnect();
    }
  }, [match, observe]);

  useEffect(() => {
    /* console.log('useEffect: wheel'); */
    const onMouseWheel = (e: WheelEvent) => {
      if (container.current && e.target !== container.current) {
        container.current.scrollTo({ top: container.current.scrollTop + (e.deltaY * 10), behavior: 'smooth'});
      }
    }
    window.addEventListener('wheel', onMouseWheel);
    return () => {
      window.removeEventListener('wheel', onMouseWheel);
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <div ref={container} className={styles.container}>
        <div className={styles.imageHolder}>
          {
            projects.map(p => (
              <div 
                key={`img-${p.id}`}
                id={p.id}
                className={styles.image}
                ref={(el) => {
                  if (el && !imageRefs.current.includes(el)) {
                    imageRefs.current.push(el)
                  }
                }}
              >
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
