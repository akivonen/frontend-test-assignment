import styles from './SignUpSuccess.module.scss';
import SignedUpImage from '@assets/images/success-image.svg';

export default function SignUpSuccess() {
  return (
    <>
      <h2 className={styles.h1}>User successfully registered</h2>
      <img
        src={SignedUpImage}
        className={styles.successImage}
        alt="User successfully registered"
        aria-label="User successfully registered"
      />
    </>
  );
}
