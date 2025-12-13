import React from 'react';

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal header for generator */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="container py-4">
          <h1 className="text-lg font-semibold text-primary-700">
            Mieter-Selbstauskunft Generator
          </h1>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
