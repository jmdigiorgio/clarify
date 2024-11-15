import React from 'react';

export default function Header() {
  return (
    <header className="bg-secondary text-primary p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          Clarity
        </div>
      </nav>
    </header>
  );
}
