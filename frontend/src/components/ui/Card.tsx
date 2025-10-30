import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClasses = hover ? 'hover:bg-primary/5 cursor-pointer' : '';
  
  return (
    <div className={`bg-surface-dark border border-white/10 rounded-xl overflow-hidden transition-colors ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

Card.Image = function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-cover bg-center h-48" style={{ backgroundImage: `url("${src}")` }}>
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

Card.Title = function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-bold text-text-dark-heading">{children}</h3>;
};

Card.Description = function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm mt-1 text-text-dark-body">{children}</p>;
};

