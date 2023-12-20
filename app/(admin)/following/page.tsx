"use client";
import { useEffect, useState } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export default function FollowingPage() {
  const [followedUsers, setFollowedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState("following-you");
  const [isLoading, setIsLoading] = useState(true);

  const filterUsers =
    (filterByType?: (user: User) => boolean) => (user: User) => {
      if (filterByType && !filterByType(user)) return false;
      if (!searchText) return user;
      return (
        user.full_name.includes(searchText) ||
        user.username.includes(searchText)
      );
    };

  useEffect(() => {
    async function getFollowedUsers() {
      setIsLoading(true);
      const res = await fetch("/api/followed");
      if (res.status === 200) {
        const followed = await res.json();
        console.log("🐞 > followed:", followed);
        setFollowedUsers(followed);
      }
      setIsLoading(false);
    }
    getFollowedUsers();
  }, []);

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="md:flex items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Following ({followedUsers.length})
        </h2>
        <div className="flex items-center space-x-2 mt-6 md:mt-0">
          <Search
            onChange={(event) =>
              setSearchText((event.target as HTMLInputElement).value)
            }
          />
          <Button>Search</Button>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="w-full h-[30px] rounded-full" />
            <Skeleton className="w-full h-[30px] rounded-full" />
            <Skeleton className="w-full h-[30px] rounded-full" />
          </div>
        ) : (
          <Tabs defaultValue="following-you" onValueChange={setCurrentTab}>
            <div className="md:hidden mb-8">
              <TabsList asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="secondary" className="w-full">
                      <MixerHorizontalIcon className="mr-2 h-4 w-4" /> Filter:{" "}
                      {currentTab}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <TabsTrigger value="following-you">
                        Following you
                      </TabsTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TabsTrigger value="non-following-you">
                        Non Following you
                      </TabsTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TabsTrigger value="unfollowed-by-me">
                        Unfollowed by me
                      </TabsTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TabsTrigger value="unfollowers">Unfollowers</TabsTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsList>
            </div>

            <div className="hidden md:block w-full mb-8">
              <TabsList>
                <TabsTrigger value="following-you">Following you</TabsTrigger>
                <TabsTrigger value="non-following-you">
                  Non Following you
                </TabsTrigger>
                <TabsTrigger value="unfollowed">Unfollowed by me</TabsTrigger>
                <TabsTrigger value="unfollowers">Unfollowers</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="following-you" className="space-y-8">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !!user.follows_viewer)
                )}
              />
            </TabsContent>
            <TabsContent value="non-following-you" className="space-y-8">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !user.follows_viewer)
                )}
              />
            </TabsContent>
            <TabsContent value="unfollowed-by-me" className="space-y-8">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !!user.unfollowed_at)
                )}
              />
            </TabsContent>
            <TabsContent value="unfollowers" className="space-y-8">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !!user.unfollowed_me_at)
                )}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function UsersList({ users }: { users: User[] }) {
  return (
    <>
      {users.map((user) => (
        <a
          key={user.id}
          className="block"
          href={`https://www.instagram.com/${user.username}`}
          target="_blank"
        >
          <div  className="flex items-center">
            <Avatar className="h-9 w-9">
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
              {format(new Date(user.created_at || ""), "dd/MM/yy")}
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
