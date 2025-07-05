import TruncatedText from '../../components/TruncatedText/TruncatedText';
import { User } from 'types';

export default function UsersList({ users }: { users: User[] }) {
  return users.map((user) => (
    <li key={user.id}>
      <div className="user-card">
        <img
          src={user.photo}
          alt={`${user.name} avatar`}
          className="user-card__img"
        />
        <TruncatedText text={user.name} />
        <div className="user-card__details">
          <TruncatedText text={user.position} />
          <TruncatedText text={user.email} />
          <p>{user.phone}</p>
        </div>
      </div>
    </li>
  ));
}
