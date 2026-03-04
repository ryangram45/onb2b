"use client";

import { useRouter } from "next/navigation";

export default function UserRowLink({
  id,
  index,
}: {
  id: string;
  index: number;
}) {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push(`/admin/users/${id}`)}
      className="cursor-pointer text-blue-500 hover:underline"
    >
      {index + 1}
    </span>
  );
}