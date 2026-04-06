import { useEffect, useState } from 'react';
import './Contact.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact() {
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();
  const { contextSafe } = useGSAP({ dependencies: [ timeline, setTimeline ] });

  const createTimeline = contextSafe(() => {
    if (!timeline) { 
      const tl = gsap.timeline({repeat: -1})
      .from('.contact__content__link[title="linkedin"]', {
        yPercent: -100,
        duration: 2.6,
        ease: 'bounce'
      })
      .to('.contact__content__link[title="email"]', {
        yPercent: -100,
        rotate: 360,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1.6')
      .to('.contact__content__link[title="email"]', {
        yPercent: 0,
        duration: 2.6,
        ease: 'bounce'
      })
      .to('.contact__content__link[title="github"]', {
        yPercent: -100,
        rotate: 360,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1.6')
      .to('.contact__content__link[title="github"]', {
        yPercent: 0,
        duration: 2.6,
        ease: 'bounce'
      })
      .to('.contact__content__link[title="email"]', {
        yPercent: -100,
        rotate: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1.6')
      .to('.contact__content__link[title="email"]', {
        yPercent: 0,
        duration: 2.6,
        ease: 'bounce'
      })
      .to('.contact__content__link[title="linkedin"]', {
        yPercent: -100,
        rotate: -360,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1.6');
      //
      console.log(tl);
      setTimeline(tl);
    }
  })

  const killTimeline = contextSafe(() => {
    if (timeline) {
      timeline.kill();
      setTimeline(undefined);
      gsap.set('.contact__content__link', { yPercent: 0, rotate: 0 });
    }
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <  window.innerHeight) {
        killTimeline();
      } else {
        createTimeline();
      }
    }
    //
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [killTimeline, createTimeline])
  
  return (
    <div className="contact">
      <div className="contact__content">
        <a 
          className="contact__content__link"
          href="https://www.linkedin.com/in/adam-ashby-b92148189/" 
          target="_blank"
          title="linkedin" 
          aria-label="linkedin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
            <path d="M400,0C179.06,0,0,179.06,0,400s179.06,400,400,400,400-179.06,400-400S620.94,0,400,0ZM288.13,567.34h-77.97v-249.53h77.97v249.53ZM247.03,286.56h-.62c-28.28,0-46.56-19.06-46.56-43.28s18.91-43.28,47.66-43.28,46.41,18.59,47.03,43.28c.16,24.06-18.12,43.28-47.5,43.28ZM600,567.34h-88.44v-129.06c0-33.75-13.75-56.87-44.22-56.87-23.28,0-36.25,15.62-42.19,30.63-2.19,5.31-1.87,12.81-1.87,20.47v134.84h-87.66s1.09-228.75,0-249.53h87.66v39.22c5.16-17.19,33.13-41.56,77.81-41.56,55.47,0,98.91,35.94,98.91,113.12v138.75Z"/>
          </svg>
        </a>

        <a 
          className="contact__content__link"
          href="mailto: dev@adamashby.com" 
          target="_blank"
          title="email" 
          aria-label="email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
            <path d="M557.61,794h-157.11c-53.1,0-104.64-10.41-153.18-30.94-46.86-19.82-88.94-48.19-125.07-84.31-36.13-36.13-64.49-78.2-84.31-125.07-20.53-48.54-30.94-100.08-30.94-153.18s10.41-104.64,30.94-153.18c19.82-46.86,48.19-88.94,84.31-125.07,36.13-36.12,78.2-64.49,125.07-84.31,48.54-20.53,100.08-30.94,153.18-30.94s104.64,10.41,153.18,30.94c46.86,19.82,88.94,48.19,125.07,84.31,36.13,36.12,64.49,78.2,84.31,125.07,20.53,48.54,30.94,100.08,30.94,153.18v58.92c0,76.2-61.99,138.19-138.19,138.19-47.18,0-88.92-23.77-113.86-59.96-35.85,36.96-86.01,59.96-141.44,59.96-108.69,0-197.11-88.42-197.11-197.11s88.42-197.11,197.11-197.11,197.11,88.42,197.11,197.11v58.92c0,32.09,26.11,58.19,58.19,58.19s58.19-26.11,58.19-58.19v-58.92c0-83.74-32.61-162.47-91.82-221.68-59.21-59.21-137.94-91.82-221.68-91.82s-162.47,32.61-221.68,91.82c-59.21,59.21-91.82,137.94-91.82,221.68s32.61,162.47,91.82,221.68c59.21,59.21,137.94,91.82,221.68,91.82h157.11c22.09,0,40,17.91,40,40s-17.91,40-40,40ZM400.5,283.39c-64.58,0-117.11,52.54-117.11,117.11s52.54,117.11,117.11,117.11,117.11-52.54,117.11-117.11-52.54-117.11-117.11-117.11Z"/>
          </svg>
        </a>

        <a 
          className="contact__content__link"
          href="https://github.com/aashby13" 
          target="_blank"
          title="github" 
          aria-label="github"
        >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
            <path d="M500.16,395.94c-13.44-2.34-27.5-2.03-41.25-1.25-31.25,1.72-62.5,4.69-93.75,1.88-14.84-1.41-29.84-2.81-44.84-2.5-27.19.47-50,9.38-63.44,35.31-6.72,12.81-8.28,26.56-7.81,40.78,1.09,40,18.44,62.81,56.56,74.22,30.62,9.06,62.03,10.31,93.59,9.69,11.72,0,23.44.62,35.16-.16,24.22-1.41,47.97-5,70.94-13.44,23.75-8.75,37.97-25.47,43.13-49.69,2.03-9.38,2.97-19.22,2.81-28.75-.31-32.34-22.19-61.25-51.09-66.09ZM346.41,501.72c-10.16,11.09-24.84,11.25-35.31.47-7.66-7.81-12.03-19.84-12.03-34.84.31-10.16,3.28-21.25,12.03-30.16,10.47-10.78,25.16-10.62,35.31.31,15.31,16.56,15.31,47.66,0,64.22ZM488.44,502.5c-9.53,9.84-23.28,10.16-33.44,1.09-17.5-15.94-17.5-51.41,0-67.5,10-9.22,23.75-8.91,33.44.94,8.91,9.06,11.88,20.47,12.34,32.66-.47,12.34-3.59,23.59-12.34,32.81Z"/>
            <path d="M400,0C179.06,0,0,179.06,0,400s179.06,400,400,400,400-179.06,400-400S620.94,0,400,0ZM605,435c-2.19,17.81-5.94,36.09-12.34,52.81-18.75,47.97-56.25,74.38-105.94,82.34-28.44,4.53-57.66,4.69-89.22,7.03-28.28-2.5-59.38-2.81-89.53-8.13-58.44-10.31-98.12-51.25-109.69-109.84-5.94-29.84-7.66-59.84,1.56-89.53,4.84-15.31,12.81-28.91,23.13-41.25,1.41-1.56,2.66-3.91,2.5-5.94-1.72-26.88,1.41-53.44,9.37-79.06,6.56-21.41,1.72-20.16,25.47-13.91,28.59,7.5,53.59,22.97,78.13,39.06,2.81,1.88,7.19,2.66,10.63,2.03,34.69-5.31,69.22-5.63,103.91.47,2.5.47,5.78-.47,8.12-1.88,21.09-13.75,42.81-26.09,66.56-34.69,8.59-3.12,17.66-5.16,26.41-7.81,3.91-1.09,5.63.31,7.03,4.06,10.63,29.69,15,60.16,13.44,91.56-.16,1.72.78,4.06,1.87,5.47,26.72,30.94,33.44,67.81,28.59,107.19Z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}