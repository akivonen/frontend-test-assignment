import { startTransition, useState } from 'react';
import UserCard from '@components/Users/UserCard/UserCard';
import { USERS_COUNT_IN_BLOCK as users_per_block } from '@src/constants/users';
import useData from '@src/hooks/useData';

export default function UserSection() {
  const { users, usersError } = useData();
  const [visibleUsersCount, setVisibleUsersCount] =
    useState<number>(users_per_block);

  const handleShowMore = () => {
    startTransition(() => {
      if (visibleUsersCount < users.length) {
        setVisibleUsersCount((prev) =>
          prev + users_per_block <= users.length
            ? prev + users_per_block
            : users.length
        );
      }
    });
  };

  return (
    <section id="users" className="container users" aria-label="Users list">
      <h2 className="h1">Working with GET request</h2>
      {usersError && (
        <div className="users__error-message" role="alert">
          <p>{usersError}</p>
        </div>
      )}
      {users.length > 0 ? (
        <ul className="users__list">
          {users.slice(0, visibleUsersCount).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
      {visibleUsersCount < users.length && (
        <button onClick={() => handleShowMore()} className="button button--lg">
          Show more
        </button>
      )}
    </section>
  );
}
