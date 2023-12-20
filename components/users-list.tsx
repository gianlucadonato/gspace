import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

export function UsersList({ users }: { users: User[] }) {
  return (
    <div className="space-y-8">
      {users.map((user) => (
        <a
          key={user.id}
          className="block"
          href={`https://www.instagram.com/${user.username}`}
          target="_blank"
        >
          <div  className="flex items-center">
            <Avatar className={`h-9 w-9 ${user.follows_viewer ? "" : "border-[1px] border-red-600 border-solid"} ${!user.follows_viewer && !!user.unfollowed_me_at ? '' : 'border-orange-300'}`}>
              <AvatarImage src={user.profile_pic_url} alt="Avatar" />
              <AvatarFallback>{user.full_name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.full_name}
              </p>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </div>
            <div className="ml-auto text-muted-foreground text-xs">
              {user.created_at ? format(new Date(user.created_at), "dd/MM/yy") : null}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}