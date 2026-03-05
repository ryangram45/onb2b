import UsersTable from "@/components/admin/users-table";
import { getUsers } from "@/services/get-users";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <UsersTable users={users} />
    </div>
  );
}