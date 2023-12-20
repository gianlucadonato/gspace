"use client";
import { useEffect, useState } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsersList } from "@/components/users-list";


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
                <TabsTrigger value="unfollowed-by-me">Unfollowed by me</TabsTrigger>
                <TabsTrigger value="unfollowers">Unfollowers</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="following-you">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !!user.follows_viewer)
                )}
              />
            </TabsContent>
            <TabsContent value="non-following-you">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !user.follows_viewer)
                )}
              />
            </TabsContent>
            <TabsContent value="unfollowed-by-me">
              <UsersList
                users={followedUsers.filter(
                  filterUsers((user) => !!user.unfollowed_at)
                )}
              />
            </TabsContent>
            <TabsContent value="unfollowers">
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


