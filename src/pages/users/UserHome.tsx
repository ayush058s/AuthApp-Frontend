// "use client"; ??

import useAuth from "@/auth/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Home, BarChart, Users, Folder, Settings, Search, Bell } from "lucide-react";
import { allUsers, getCurrentUser } from "@/services/AuthService";
import { useEffect, useState } from "react";
import type User from "@/models/User";
import toast from "react-hot-toast";

const UserHome = () => {

  // all users
  const [allData, setAllData] = useState<User[]>([])

  //
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const { user, logout } = useAuth();
  const[user1, setUser1] = useState<User |null>(null)

  // as i need to display table at the time of load so no need to render again and again
  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = async () =>{
    try {
      const data = await allUsers();
      setAllData(data);
      setFilteredData(data);
      toast.success("All users")
    } catch (error) {
      console.log(error)
      toast.error("Error fetching users")
    }
  }

  
  const getUserData = async () => {
    try {
      const user1 = await getCurrentUser(user?.email);
      setUser1(user1);
      toast.success("User1 fetched successfully")
    } catch (error) {
      console.log(error);
      toast.error("error in getting data")
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0b0b0b] border-r border-[#1f1f1f] p-4">

        <h2 className="text-lg font-semibold mb-6">Auth Admin</h2>

        <nav className="space-y-2">
          <SidebarItem icon={<Home size={16} />} label="Overview" active />
          <SidebarItem icon={<BarChart size={16} />} label="Analytics" />
          <SidebarItem icon={<Users size={16} />} label="Users" />
          <SidebarItem icon={<Folder size={16} />} label="Sessions" />
          <SidebarItem icon={<Settings size={16} />} label="Settings" />
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-linear-to-r from-purple-400 to-purple-600 rounded-sm" />
            <span className="font-semibold">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="flex items-center bg-[#111] border border-[#1f1f1f] px-3 py-1 rounded-lg">
              <Search size={16} className="text-gray-400 mr-2" />
              <Input
                placeholder="Search..."
                className="bg-transparent border-none focus-visible:ring-0 text-sm"
              />
            </div>

            <Bell size={18} className="text-gray-400" />

            {/* <Badge className="bg-green-600">{user?.name}</Badge>

            <Button variant="outline" onClick={() => logout()}>
              Logout
            </Button> */}
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Overview</h1>
          <p className="text-gray-400 text-sm">
            Quick insights for your auth system
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <StatCard title="Total Users" value="1,238" change="+4.2%" />
          <StatCard title="Active Sessions" value="842" change="+1.1%" />
          <StatCard title="Providers" value="3" change="Google/GitHub" />
          <StatCard title="Uptime" value="99.97%" change="Stable" />

        </div>

        {/* TABLE */}
        <Card className="bg-[#0f0f0f] border-[#1f1f1f]">
          <CardContent className="p-4">

            <div className="flex justify-between mb-4">
              <div className="flex gap-2">

                <Button onClick={() => {
                  setFilteredData(allData);
                }} size="sm" variant="secondary">
                  All
                </Button>

                <Button 
                onClick={() => {
                  try {
                    const active = allData.filter(u => Boolean(u.enabled));
                  setFilteredData(active);
                  toast.success("Showing Active Users")
                  } catch (error) {
                    
                  }
                }} 
                size="sm" variant="ghost">
                  Active
                </Button>
                <Button 
                onClick={() => {
                  try {
                    const disabled = allData.filter(u => !Boolean(u.enabled));
                    setFilteredData(disabled);
                    toast.success("Disabled Users")
                  
                  } catch (error) {
                    
                  }
                }}
                 size="sm" variant="ghost">
                  Disabled
                </Button>
              </div>
              <span className="text-sm text-gray-400">
                Showing {allData.length} users
              </span>
            </div>

            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-[#1f1f1f]">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Provider</th>
                  <th className="text-left">Created</th>
                </tr>
              </thead>

              <tbody>
                {allData.map((user, index) => (
                  <TableRow name={user.name || "No name"} 
                  status={user.enabled ? "Active" : "Disabled"} 
                  provider={user.providor} 
                  date={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"} 
                  />
                ))}
                
                

                {/* <TableRow name="Ayush Singh" status="Active" provider="Google" date="Today" />
                <TableRow name="Rohit" status="Active" provider="GitHub" date="2d ago" />
                <TableRow name="Neha" status="Disabled" provider="Email" date="1w ago" />
                <TableRow name="Arjun" status="Active" provider="Google" date="3h ago" /> */}
              </tbody>
            </table>

          </CardContent>
        </Card>
        <p>
          {user1?.email}
        </p>

      </div>
    </div>
  );
};

export default UserHome;





/* ---------------- COMPONENTS ---------------- */

const SidebarItem = ({ icon, label, active = false }: any) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm
    ${active ? "bg-[#1a1a1a]" : "hover:bg-[#141414]"}`}
  >
    {icon}
    {label}
  </div>
);

const StatCard = ({ title, value, change }: any) => (
  <Card className="bg-[#0f0f0f] border-[#1f1f1f]">
    <CardContent className="p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
      <p className="text-xs text-gray-400 mt-1">{change}</p>
    </CardContent>
  </Card>
);

const TableRow = ({ name, status, provider, date }: any) => (
  <tr className="border-b border-[#1f1f1f] hover:bg-[#141414]">
    <td className="py-3">{name}</td>
    <td>
      <Badge className={status === "Active" ? "bg-green-600" : "bg-red-600"}>
        {status}
      </Badge>
    </td>
    <td>{provider}</td>
    <td className="text-gray-400">{date}</td>
  </tr>
);

