import { User } from 'types';
import getAllUsers from '@api/users';
import { useEffect, useState } from 'react';
import UserCard from '@components/Users/UserCard/UserCard';
import { USERS_COUNT_IN_BLOCK as usersSpan } from '@src/constants/users';

export default function UserSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [visibleUsersCount, setVisibleUsersCount] = useState<number>(usersSpan);

  const handleShowMore = () => {
    if (visibleUsersCount < users.length) {
      setVisibleUsersCount((prev) =>
        prev + usersSpan <= users.length ? prev + usersSpan : users.length
      );
    }
  };

  useEffect(() => {
    const getAllUsersAction = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    getAllUsersAction();
  }, []);

  return (
    <section id="users" className="container users" aria-label="Users list">
      <h1>Working with GET request</h1>
      {users && (
        <ul className="users__list">
          {users.slice(0, visibleUsersCount).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
      {visibleUsersCount < users.length && (
        <button onClick={() => handleShowMore()} className="button button--lg">
          Show more
        </button>
      )}
    </section>
  );
}
