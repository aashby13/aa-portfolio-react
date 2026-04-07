import styles from './ScrollPrompt.module.scss'

export default function ScrollPrompt() {
  return (
    <div className={styles.prompt}>
      <div className={styles.text}>
        scroll
      </div>
      
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
          <path d="M166.67,500c0,61.88,24.58,121.24,68.34,164.99,43.76,43.76,103.11,68.34,164.99,68.34s121.23-24.58,164.99-68.34c43.76-43.76,68.34-103.11,68.34-164.99v-200c0-61.88-24.58-121.23-68.34-164.99-43.76-43.76-103.11-68.34-164.99-68.34s-121.23,24.58-164.99,68.34c-43.76,43.76-68.34,103.11-68.34,164.99v200Z"/>
          <path d="M400,200v266.67"/>
          <path d="M500,366.67l-100,100-100-100"/>
        </svg>
      </div>
    </div>
  )
}
