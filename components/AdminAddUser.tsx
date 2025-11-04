// --- START OF FILE src/components/AdminAddUser.tsx ---
"use client";

import React, { useState } from 'react';
import { database } from '@/firebase'; // তোমার firebase.ts ফাইল থেকে database ইম্পোর্ট করো
import { ref, push, set } from 'firebase/database'; // Realtime Database এর ফাংশন ইম্পোর্ট করো
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // ধরে নিচ্ছি তোমার কাছে Shadcn UI এর Switch কম্পোনেন্ট আছে

export function AdminAddUser() {
  const [username, setUsername] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddUser = async () => {
    if (!username.trim()) {
      setMessage('Username cannot be empty.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const approvedUsersRef = ref(database, 'approved_users');
      // Firebase স্বয়ংক্রিয়ভাবে একটি ইউনিক ID জেনারেট করবে (push)
      const newUserRef = push(approvedUsersRef); 
      await set(newUserRef, {
        username: username.trim().toLowerCase(), // ছোট হাতের করে সেভ করা ভালো
        isActive: isActive,
      });
      setMessage(`User "${username}" added successfully!`);
      setUsername('');
      setIsActive(true);
    } catch (error) {
      console.error("Error adding user to Firebase:", error);
      setMessage(`Failed to add user: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto my-8 bg-card">
      <h2 className="text-xl font-bold mb-4 text-foreground">Add New Approved User</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="admin-username" className="text-foreground">Username</Label>
          <Input
            id="admin-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="mt-1 bg-input text-foreground border-border"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="is-active" className="text-foreground">Is Active</Label>
        </div>
        <Button onClick={handleAddUser} disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {loading ? 'Adding...' : 'Add User'}
        </Button>
        {message && (
          <p className={`mt-2 text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
// --- END OF FILE src/components/AdminAddUser.tsx ---
