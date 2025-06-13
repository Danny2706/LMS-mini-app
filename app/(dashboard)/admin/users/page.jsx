"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const USERS_PER_PAGE = 6;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Reset page on filters/search
  useEffect(() => {
    setPage(1);
  }, [roleFilter, statusFilter, searchQuery]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userRole = user.role?.toLowerCase() || "";
      const userStatus = user.status?.toLowerCase() || "";

      const roleMatch = roleFilter === "all" || userRole === roleFilter;
      const statusMatch = statusFilter === "all" || userStatus === statusFilter;
      const searchMatch =
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());

      return roleMatch && statusMatch && searchMatch;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, page]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Engaging Users Insights</h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-stone-700 text-gray-100 dark:bg-stone-900 dark:text-stone-50 px-5 py-3">
            Total: {filteredUsers.length}
          </Badge>
          <Input
            type="text"
            placeholder="Search users..."
            className="w-48 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md border-gray-300 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {["all", "admin", "trainer", "user"].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "outline"}
              onClick={() => setRoleFilter(role)}
            >
              {role === "all"
                ? "All Roles"
                : role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {["all", "active", "inactive"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
            >
              {status === "all"
                ? "All Statuses"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-stone-100 dark:bg-stone-950 shadow">
        <table className="min-w-full text-sm text-stone-700 dark:text-stone-50">
          <thead className="bg-stone-100 border-b dark:bg-stone-950">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-stone-600"
              >
                <td className="p-3">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="font-medium hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 capitalize">
                  <Badge
                    className={
                      user.status?.toLowerCase() === "active"
                        ? "text-green-500 bg-transparent"
                        : "text-gray-400 bg-transparent"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      setUsers((prev) => prev.filter((u) => u.id !== user.id))
                    }
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-400 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          variant="outline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Prev
        </Button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          variant="outline"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
