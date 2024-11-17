'use client';

// page.tsx
import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <button onClick={onClick} className="bg-primary border border-secondary rounded-lg shadow-lg p-6 m-4 flex-1 w-full text-left card hover:bg-highlighted">
      <h3 className="text-secondary text-xl font-bold mb-2">{title}</h3>
      <MarkdownRenderer markdown={description} />
    </button>
  );
};

const markdownContentGuide = `

# Views

Clarify lets you manage your requirements in three simultaneous views. Switch between views whenever and as often as you like. Create, view, modify and remove requirements in whichever view you prefer.

`;

const markdownContentGraph = `

# **Graph View**  
> The Graph View provides a visual representation of requirements and their relationships. Using a graph-based approach, users can easily explore how individual requirements are interconnected, making it simpler to trace dependencies and see the broader structure of a system. 

`;

const markdownContentTable = `

# **Table View**  
> The Table View offers a structured list of requirements, much like a spreadsheet, to help users efficiently manage and organize data. With features such as sorting, filtering, and bulk editing, users can quickly analyze and adjust requirements as needed. 

`;

const markdownContentDoc = `

# **Doc View**  
> The Document View presents a rich-text representation of requirements, emphasizing detailed descriptions and collaboration. Users can add comments to individual requirements, making it an ideal workspace for collaborative editing and discussions.

`;

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <div style={{ textAlign: "center" }} className="prose prose-lg max-w-prose mx-auto p-4">
        <MarkdownRenderer markdown={markdownContentGuide} />
      </div>
      <div className="container mx-auto flex justify-around items-stretch flex-wrap p-8">
        <Card title="" description={markdownContentGraph} onClick={() => router.push('/graph')} />
        <Card title="" description={markdownContentTable} onClick={() => alert('WIP')} />
        <Card title="" description={markdownContentDoc} onClick={() => alert('WIP')} />
      </div>
    </div>
  );
}
