import styles from './Hero.module.scss';
import useScrollTo from '@src/hooks/useScrollTo';

export default function Hero() {
  const { scrollToElement } = useScrollTo();
  return (
    <section className={`${styles.hero} `} aria-label="Hero">
      <div className={styles.heroContent}>
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button
          type="button"
          className={styles.heroButton}
          onClick={() => scrollToElement('#sign-up')}
        >
          Sign up
        </button>
      </div>
    </section>
  );
}
