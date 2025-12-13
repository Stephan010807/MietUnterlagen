import React from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation will go here */}
      <main className="flex-1">{children}</main>
      {/* Footer will go here */}
    </div>
  );
}
