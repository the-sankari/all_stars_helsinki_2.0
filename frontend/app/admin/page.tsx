'use client';

import { useAuthGuard } from "@/hooks/useAuth";

export default function AdminPage() {
  const { loading, authorized } = useAuthGuard();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Only visible to logged-in admins.</p>
    </div>
  );
}
