import type { ProjectData } from '../../lib/types';
import { useEffect, useRef, useState } from 'react';
import styles from './ImageScroll.module.scss'
import { href, useMatch, useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { gsap, ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollToPlugin);

interface IProps {
  projects: ProjectData[];
  pid?: string;
  mainEl: HTMLDivElement | null

}

export default function ImageScroll({ projects, pid, mainEl }: IProps) {
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const match = useMatch('/portfolio/:pid/more');
  const [ observe, setObserve ] = useState(true);
  const [ path, setPath ] = useState<string>();
  const [ newPath ] = useDebounce(path, 400);
  const [ init, setInit ] = useState(true);
  const [ isSmallDevice, setIsSmallDevice ] = useState(false);

  useGSAP(() => {
    /* console.log('ImageScroll useGSAP', pid, newPath, init); */
    if (pid && !newPath?.includes(pid)) {
      setPath(undefined);
      if (init) setInit(false);
      gsap.to(mainEl, { 
        duration: init ? 0 : 1.5, 
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
    /* console.log('ImageScroll useEffect: observer'); */
    let observer: IntersectionObserver;
    if (observe) {
      let skipFirst = true;
      const observerCB = (entries: IntersectionObserverEntry[]) => {
        if (skipFirst) {
          skipFirst = false;
        } else {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setPath(href(`/portfolio/:pid${match ? '/more' : ''}`, { pid: (entry.target as HTMLElement).dataset.id }))
            }
          });
        }
      }
      //
      observer = new IntersectionObserver(observerCB, { 
        root: mainEl, 
        rootMargin: isSmallDevice ? '-22% 0px -22% 0px' : '-26% 0px -26% 0px',
        threshold: isSmallDevice ? 0.85 : 0.9
      });
      //
      imageRefs.current.forEach(el => {
        observer.observe(el);
      });
    }
    return () => {
      observer?.disconnect();
    }
  }, [match, observe, mainEl, isSmallDevice]);

  useEffect(() => {
    const onResize = () => {
      setIsSmallDevice(window.innerWidth <= 1024);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
      <div className={styles.container}>
        <div className={styles.imageHolder}>
          {
            projects.map(p => (
              <div 
                key={`img-${p.id}`}
                id={p.id}
                className={styles.image} 
              >
                <div
                  data-id={p.id}
                  data-current={pid ? pid === p.id : true}
                  data-init={init}
                  ref={(el) => {
                    if (el && !imageRefs.current.includes(el)) {
                      imageRefs.current.push(el)
                    }
                  }}
                >
                </div>
              </div>
            ))
          }
        </div>
      </div>
  )
}
