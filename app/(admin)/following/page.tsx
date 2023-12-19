import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";

export const metadata: Metadata = {
  title: "Following",
  description: "Following users list",
};

export default function FollowingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Following</h2>
        <div className="flex items-center space-x-2">
          <Search />
          <Button>Search</Button>
        </div>
      </div>
    </div>
  );
}
