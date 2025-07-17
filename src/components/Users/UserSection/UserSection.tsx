import { useTransition, useState } from 'react';
import UserCard from '@components/Users/UserCard/UserCard';
import useData from '@src/hooks/useData';
import Preloader from '@src/components/common/Preloader/Preloader';
import { USERS_COUNT_IN_BLOCK as users_per_block } from '@src/constants/users';

export default function UserSection() {
  const {
    users,
    usersError,
    isUsersLoading,
    visibleUsersCount,
    setVisibleUsersCount,
  } = useData();

  // useTransition allows to defer state update and avoid blocking UI
  const [isPending, startTransition] = useTransition();

  if (isUsersLoading || isPending) {
    return <Preloader />;
  }

  // Handles logic for Show more Butotn click
  const handleShowMore = () => {
    startTransition(() => {
      // Only increase visible count if ther a more users to show
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
        <p className="users__no-users-message">No users found</p>
      )}
      {visibleUsersCount < users.length && (
        <button onClick={() => handleShowMore()} className="button button--lg">
          Show more
        </button>
      )}
    </section>
  );
}
