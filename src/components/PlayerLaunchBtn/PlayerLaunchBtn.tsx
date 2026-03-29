import { useRef } from 'react';
import styles from './PlayerLaunchBtn.module.scss'
import { href, Link, useMatch, useParams } from 'react-router';
import { gsap, MorphSVGPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

export default function PlayerLaunchBtn() {
  const { pid } = useParams();
  const match = useMatch('/portfolio/:pid/more');
  const path = pid ? href(`/portfolio/:pid${match ? '' : '/more'}`, { pid: pid }) : '';
  const message = match ? 'less' : 'more';
  const svgRef = useRef(null);

  useGSAP(() => {
    if (message === 'more') {
      gsap.to('#open-path', { duration: 0.6, morphSVG: '#open-path', ease: 'power2.out' });
      gsap.to('text', { duration: 0.6, x: 0, ease: 'power2.out' });
    } else {
      gsap.to('#open-path', { duration: 0.6, morphSVG: '#close-path', ease: 'power2.out' });
      gsap.to('text', { duration: 0.6, x: -28, ease: 'power2.out' });
    }
  }, { scope: svgRef, dependencies: [message]})

  return (
    <Link className={styles.container} to={path} title='Launch Player'>
      <svg ref={svgRef} className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 120">
        <path className={styles.rect} d="M12 10.79h145v97H12z" />
        <path id="open-path" className={styles.play}
          d="M52.6 59.3V26.5c0-3.4 2.4-4.8 5.4-3.1l28.3 16.4 28.3 16.4c3 1.7 3 4.5 0 6.2L86.3 78.7 58 95.1c-3 1.7-5.4.3-5.4-3.1V59.3z" />
        <path id="close-path" className={styles.play}
          d="M119 73.3L89.8 49.2l28-23.6-3.9-4.6-28.8 24.4-30-24.6-3.8 4.6 29.1 23.9-28 23.7 3.9 4.5 28.8-24.3 30.1 24.7z" />
        <text className={styles.text} x="94" y="100">{ message }&#8230;</text>
      </svg>
    </Link>
  )
}