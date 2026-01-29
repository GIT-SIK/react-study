import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/api";

interface User {
  id : string,
  name : string,

}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String | null> (null);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      try {
        const data:User[] = await fetchApi("/users");
        setUsers(data); 
      } catch (err) {
         setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} (ID: {user.id})</li>
        ))}
      </ul>
    </div>
  );
}
