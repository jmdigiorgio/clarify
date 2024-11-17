'use client';

// page.tsx
import React from 'react';
import Header from '@/components/Header'; // Assuming you have a Header component
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <button onClick={onClick} className="bg-primary border border-secondary rounded-lg shadow-lg p-6 m-4 max-w-sm w-full text-left">
      <h3 className="text-secondary text-xl font-bold mb-2">{title}</h3>
      <MarkdownRenderer markdown={description} />
    </button>
  );
};

const markdownContentGraph = `

# **Graph View**  
> *Description*

`;

const markdownContentTable = `

# **Table View**  
> *Description*  

`;

const markdownContentDoc = `

# **Doc View**  
> *Description*  

`;

export default function Page() {
  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <div className="container mx-auto flex justify-around items-center flex-wrap p-8">
        <Card title="" description={markdownContentGraph} onClick={() => alert('WIP')} />
        <Card title="" description={markdownContentTable} onClick={() => alert('WIP')} />
        <Card title="" description={markdownContentDoc} onClick={() => alert('WIP')} />
      </div>
    </div>
  );
}
