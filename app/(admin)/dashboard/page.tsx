"use client";

import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
import { UsersList } from "@/components/users-list";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { Report } from "@/types";
import { format } from "date-fns";

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isUploading, setIsUploding] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function getReports() {
      setIsLoading(true);
      const res = await fetch("/api/reports");
      if (res.status === 200) {
        const body = await res.json();
        console.log("🐞 > reports:", body);
        setReports(body);
      }
      setIsLoading(false);
    }
    getReports();
  }, []);

  const scrapeFollowed = async () => {
    setIsScraping(true);
    const res = await fetch("/api/scrape-followed", { method: "POST" });
    if (res.status === 200) {
      const body = await res.json();
      console.log('🐞 > scrapeFollowed:', body);
      setIsScraping(false);
      return body;
    }
    setIsScraping(false);
  };

  const uploadFollowed = async (body: any) => {
    if (!body) return;
    setIsUploding(true);
    const res = await fetch("/api/followed", { method: "POST", body: JSON.stringify(body) });
    if (res.status === 200) {
      const body = await res.json();
      console.log('🐞 > uploadFollowed:', body);
    }
    setIsUploding(false);
  };

  const createReport = async () => {
    const followed = await scrapeFollowed();
    await uploadFollowed(followed)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="md:flex items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2 mt-6 md:mt-0">
          <CalendarDateRangePicker />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="fetch-data">Fetch Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                There are {reports.length} reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="w-full h-[30px]" />
                  <Skeleton className="w-full h-[30px]" />
                  <Skeleton className="w-full h-[30px]" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>followed by viewer</TableHead>
                      <TableHead>follows viewer</TableHead>
                      <TableHead>new followed</TableHead>
                      <TableHead>new unfollowed</TableHead>
                      <TableHead>new followers</TableHead>
                      <TableHead>new unfollowers</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow
                        key={report.created_at}
                        onClick={() => {
                          setSelectedReport(report);
                          setOpenDialog(true);
                        }}
                      >
                        <TableCell>{report.followed_by_viewer}</TableCell>
                        <TableCell>{report.follows_viewer}</TableCell>
                        <TableCell>{report.new_followed.length}</TableCell>
                        <TableCell>{report.new_unfollowed.length}</TableCell>
                        <TableCell
                          className={
                            report.new_followers.length > 0
                              ? "text-lime-500"
                              : ""
                          }
                        >
                          {report.new_followers.length}
                        </TableCell>
                        <TableCell
                          className={
                            report.new_unfollowers.length > 0
                              ? "text-red-500"
                              : ""
                          }
                        >
                          {report.new_unfollowers.length}
                        </TableCell>
                        <TableCell className="text-right">
                          {format(
                            new Date(report.created_at || ""),
                            "dd/MM/yy HH:mm"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fetch-data">
          <div className="flex w-full justify-center p-8">
            {isScraping && (
              <div>
                <div className="mx-auto w-8 h-8"><Spinner /></div>
                <div className="mt-4">Scraping data...</div>
              </div>
            )}

            {isUploading && (
              <div>
                <div className="mx-auto w-8 h-8"><Spinner /></div>
                <div className="mt-4">Scraping data ✅</div>
                <div className="mt-4">Uploading data...</div>
              </div>
            )} 
            
            {!isScraping && !isUploading && (
              <Button onClick={() => createReport()} variant="destructive">
                <RocketIcon className="mr-2 h-4 w-4" />
                Fetch Data
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="overflow-hidden h-[90%]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              {selectedReport
                ? format(new Date(selectedReport?.created_at), "dd/MM/yy HH:mm")
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-scroll space-y-4">
            {!!selectedReport?.new_followers.length && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    New followers ({selectedReport?.new_followers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsersList users={selectedReport?.new_followers} />
                </CardContent>
              </Card>
            )}
            {!!selectedReport?.new_unfollowers.length && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    New unfollowers ({selectedReport?.new_unfollowers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsersList users={selectedReport?.new_unfollowers} />
                </CardContent>
              </Card>
            )}
            {!!selectedReport?.new_followed.length && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    New followed ({selectedReport?.new_followed.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsersList users={selectedReport?.new_followed} />
                </CardContent>
              </Card>
            )}
            {!!selectedReport?.new_unfollowed.length && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    New unfollowed ({selectedReport?.new_unfollowed.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsersList users={selectedReport?.new_unfollowed} />
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
