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
  const [ path, setPath ] = useState<string>();
  const [ observe, setObserve ] = useState(true);
  const { pid } = useParams()
  const [ newPath ] = useDebounce(path, 200);

  useGSAP(() => {
    if (pid) {
      gsap.to(container.current, { 
        duration: 1, 
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
    console.log('useEffect');
    const onMouseWheel = (e: WheelEvent) => {
      if (container.current && e.target !== container.current) {
        container.current.scrollTo({ top: container.current.scrollTop + (e.deltaY * 8), behavior: 'smooth'});
      }
    }
    window.addEventListener('wheel', onMouseWheel);
    //
    let observer: IntersectionObserver;
    if (observe) {
      const observerCB = (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.99) {
              console.log(entry.target.id, entry.intersectionRatio);
              setPath(href(`/portfolio/:pid${match ? 'more' : ''}`, { pid: entry.target.id }))
            }
          });
      }
      observer = new IntersectionObserver(observerCB, { root: container.current, threshold: 0.99 });
      imageRefs.current.forEach(el => {
        observer.observe(el);
      });
      console.log(imageRefs);
    }
    
    return () => {
      window.removeEventListener('wheel', onMouseWheel);
      observer?.disconnect();
    }
  }, [match, observe]);

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
                ref={(el) => {if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el)}}
              >
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
