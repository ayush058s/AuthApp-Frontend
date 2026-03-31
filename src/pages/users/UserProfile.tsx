import React, { useState, useEffect } from "react";
import useAuth from "@/auth/store";
import type User from "@/models/User";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
  const { user: globalUser, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(globalUser);

  // sync with global store
  useEffect(() => {
    setFormData(globalUser);
  }, [globalUser]);

  if (!formData) {
    return <div className="text-white p-6">No user found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // update Zustand store directly
    useAuth.setState({ user: formData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete account permanently?");
    if (confirmDelete) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Profile
        </h1>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            Save
          </Button>
        )}
      </div>

      {/* Card */}
      <Card className="max-w-4xl mx-auto bg-[#0f0f0f] border-[#1f1f1f]">
        <CardContent className="p-8">

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">
                {formData.name?.charAt(0) || "U"}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Name</p>
              {isEditing ? (
                <Input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="bg-black border-purple-500"
                />
              ) : (
                <p>{formData.name || "Not set"}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p>{formData.email}</p>
            </div>

            {/* Provider */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Provider</p>
              <Badge className="bg-purple-600">
                {formData.providor}
              </Badge>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <Badge
                className={
                  formData.enabled
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              >
                {formData.enabled ? "Active" : "Disabled"}
              </Badge>
            </div>

            {/* Created */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Created At</p>
              <p>{formData.createdAt || "N/A"}</p>
            </div>

            {/* Updated */}
            <div>
              <p className="text-sm text-gray-400 mb-1">Updated At</p>
              <p>{formData.updatedAt || "N/A"}</p>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-4">

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete Account
            </Button>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};


export default UserProfile
