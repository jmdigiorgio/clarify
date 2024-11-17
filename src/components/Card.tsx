// components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-primary border border-secondary rounded-lg shadow-md p-6 m-4 max-w-sm">
      <h3 className="text-xl font-bold mb-2 text-secondary">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  );
};

export default Card;
