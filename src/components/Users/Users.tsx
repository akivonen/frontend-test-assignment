import { User } from 'types';
import getAllUsers from '../../api/users';
import { useEffect, useState } from 'react';
import UsersList from '../../components/UsersList/UsersList';

export default function Users() {
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
          <UsersList users={users.slice(6, 12)} />
        </ul>
      )}
    </section>
  );
}
