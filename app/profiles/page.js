import React from 'react';
import ProfilesGrid from '../components/ProfilesGrid';

export default function ProfilesPage() {
  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold text-center mt-6">Our Team</h1>
      <ProfilesGrid />
    </main>
  );
}
