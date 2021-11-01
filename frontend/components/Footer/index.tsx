import styles from '../../styles/Footer.module.css';
import type { NextPage } from 'next';

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
        <a
          href="https://carlosarboleda.co"
          target="_blank"
          rel="noopener noreferrer">
          Powered by Carlos Arboleda
        </a>
      </footer>
  )
}

export default Footer