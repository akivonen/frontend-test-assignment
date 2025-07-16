import TruncatedText from '@components/common/TruncatedText/TruncatedText';
import { User } from 'types';
import { formatPhone } from '@src/lib/utils';
import PhotoPlaceholder from '@assets/images/photo-cover.svg';

export default function UserCard({ user }: { user: User }) {
  return (
    <li key={user.id}>
      <div className="user-card">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.name} avatar`}
            className="user-card__img"
          />
        ) : (
          <PhotoPlaceholder className="user-card__img" />
        )}

        <TruncatedText text={user.name} />
        <div className="user-card__details">
          <TruncatedText text={user.position} />
          <TruncatedText text={user.email} />
          <p>{formatPhone(user.phone)}</p>
        </div>
      </div>
    </li>
  );
}
