import styles from './page.module.css';
import Haniwa from '../components/HaniwaTest';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Haniwa />
      </main>
    </div>
  );
}
