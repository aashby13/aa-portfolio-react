import type { ProjectData } from '../../lib/types';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import styles from './ImageScroll.module.scss'
import { href, useMatch, useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { gsap, ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import useEventListener from '../../lib/useEventListener';
import { HAS_ONSCROLLEND } from '../../lib/constants';

gsap.registerPlugin(ScrollToPlugin);

interface IProps {
  projects: ProjectData[];
  pid?: string;
  mainRef: RefObject<HTMLDivElement>
}

export default function ImageScroll({ projects, pid, mainRef }: IProps) {
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const navigate = useNavigate();
  const match = useMatch('/portfolio/:pid/more');
  const [ observe, setObserve ] = useState(true);
  const [ path, setPath ] = useState<string>();
  // fallback if browser does not have scrollend event feature
  const [ newPath ] = useDebounce(path, HAS_ONSCROLLEND ? 0 : 400);
  const [ init, setInit ] = useState(true);
  const [ isSmallDevice, setIsSmallDevice ] = useState(window.innerWidth <= 1024);

  const onScrollEnd = useCallback(() => {
    /* console.log('onScrollEnd', newPath, observe); */
    if (newPath && observe) {
      navigate(newPath);
    }
  }, [newPath, observe, navigate])

  useEventListener('scrollend', onScrollEnd, mainRef, { passive: true });

  useEventListener('resize', () => { 
    setIsSmallDevice(window.innerWidth <= 1024) 
  });

  useGSAP(() => {
    /* console.log('ImageScroll useGSAP', pid, pid && !newPath?.includes(pid)); */
    if (pid && !newPath?.includes(pid)) {
      setPath(undefined);
      setObserve(false)
      if (init) setInit(false);
      gsap.to(mainRef.current, { 
        duration: init ? 0 : 1.5, 
        scrollTo: `#${pid}`, 
        ease: 'power3.out',
        delay: 0,
        onComplete: () => setObserve(true)
      });
    }
  }, { dependencies: [ pid ]})


  // fallback if browser does not have scrollend event feature
  useEffect(() => {
    if (!HAS_ONSCROLLEND && newPath) {
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
        root: mainRef.current, 
        rootMargin: isSmallDevice ? '-22% 0px -22% 0px' : '-26% 0px -26% 0px',
        threshold: /* isSmallDevice ? 0.85 :  */1
      });
      /* console.log('isSmallDevice', isSmallDevice) */
      //
      imageRefs.current.forEach(el => {
        observer.observe(el);
      });
    }
    return () => {
      observer?.disconnect();
    }
  }, [match, observe, mainRef, isSmallDevice]);

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
                <img
                  src={p.image}
                  alt={`image for ${p.name}`}
                  loading='eager'
                  data-id={p.id}
                  data-current={pid ? pid === p.id : true}
                  data-init={init}
                  ref={(el) => {
                    if (el && !imageRefs.current.includes(el)) {
                      imageRefs.current.push(el)
                    }
                  }}
                />
              </div>
            ))
          }
        </div>
      </div>
  )
}
