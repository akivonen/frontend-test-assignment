import { User } from 'types';
import getAllUsers from '@api/users';
import { useEffect, useState } from 'react';
import UserCard from '@components/Users/UserCard/UserCard';

export default function UserSection() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getAllUsersAction = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    const users = getAllUsersAction();
  }, []);

  return (
    <section id="users" className="container users" aria-label="Users list">
      <h1>Working with GET request</h1>
      {users && (
        <ul className="users__list">
          {users.slice(5, 11).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
    </section>
  );
}
