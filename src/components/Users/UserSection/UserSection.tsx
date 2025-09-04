import styles from './UserSection.module.scss';
import { useTransition } from 'react';
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
    <section id="users" className={styles.users} aria-label="Users list">
      <h2>Working with GET request</h2>
      {usersError && (
        <div className={styles.usersErrorMessage} role="alert">
          <p>{usersError}</p>
        </div>
      )}
      {users.length > 0 ? (
        <ul className={styles.usersList}>
          {users.slice(0, visibleUsersCount).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <p className={styles.usersNoUsersMessage}>No users found</p>
      )}
      {visibleUsersCount < users.length && (
        <button onClick={() => handleShowMore()} className={styles.usersButton}>
          Show more
        </button>
      )}
    </section>
  );
}
