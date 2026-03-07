import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
}

export async function RecentUsersCard({ users }: { users: User[] }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "admin" 
      ? "bg-onb2b-blue-100 text-onb2b-blue-800 dark:bg-onb2b-blue-950 dark:text-onb2b-blue-300" 
      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <Card className="col-span-1 md:col-span-1 xl:w-[70%] shadow-gray-200/60 border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-onb2b-blue-600" />
          Recent Users
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/admin/users">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users
            .slice(0, 5)
            .map((user) => (
            <Link 
              key={user.id} 
              href={`/admin/users/${user.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-onb2b-blue-100 dark:border-onb2b-blue-900">
                  <AvatarFallback className="bg-onb2b-blue-50 text-onb2b-blue-700 dark:bg-onb2b-blue-950 dark:text-onb2b-blue-300">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium group-hover:text-onb2b-blue-600 transition-colors">
                    {user.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  getRoleBadgeColor(user.role)
                )}>
                  {user.role}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
