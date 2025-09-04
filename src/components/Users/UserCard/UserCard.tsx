import styles from './UserCard.module.scss';
import TruncatedText from '@components/common/TruncatedText/TruncatedText';
import { User } from 'types';
import { formatPhone } from '@src/lib/utils';
import PhotoPlaceholderUrl from '@assets/images/photo-cover.svg?url';
import { useState } from 'react';

export default function UserCard({ user }: { user: User }) {
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageError = () => {
    setHasImageError(true);
  };
  return (
    <li key={user.id}>
      <div className={styles.userCard}>
        {user.photo && !hasImageError ? (
          <img
            src={user.photo}
            alt={`${user.name} avatar`}
            className={styles.userCardImg}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <img
            src={PhotoPlaceholderUrl}
            alt="User avatar placeholder"
            className={styles.userCardImg}
            loading="lazy"
          />
        )}

        <TruncatedText text={user.name} />
        <div className={styles.userCardDetails}>
          <TruncatedText text={user.position} />
          <TruncatedText text={user.email} />
          <p>{formatPhone(user.phone)}</p>
        </div>
      </div>
    </li>
  );
}
