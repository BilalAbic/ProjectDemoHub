import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  selectedTech?: string;
  onTechSelect?: (tech: string) => void;
  technologies?: Array<{ id: string; name: string }>;
}

export function Navbar({ selectedTech, onTechSelect, technologies = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const techFilters = [
    { id: 'all', name: 'All' },
    ...technologies.slice(0, 4), // Show first 4 technologies
  ];

  return (
    <nav className="sticky top-0 bg-background-dark/80 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-text-dark-heading text-xl font-bold font-mono tracking-tighter hover:text-primary transition-colors"
          >
            BilalAbic/DemoHub
          </Link>

          {/* Tech Filters - Desktop */}
          {technologies.length > 0 && (
            <div className="hidden md:flex items-center space-x-2">
              {techFilters.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => onTechSelect?.(tech.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    (selectedTech === tech.id || (tech.id === 'all' && !selectedTech))
                      ? 'bg-primary/20 text-text-dark-heading'
                      : 'text-text-dark-body hover:text-text-dark-heading'
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-dark-body hover:text-text-dark-heading transition-colors"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && technologies.length > 0 && (
          <div className="md:hidden pb-4 space-y-2">
            {techFilters.map((tech) => (
              <button
                key={tech.id}
                onClick={() => {
                  onTechSelect?.(tech.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  (selectedTech === tech.id || (tech.id === 'all' && !selectedTech))
                    ? 'bg-primary/20 text-text-dark-heading'
                    : 'text-text-dark-body hover:text-text-dark-heading'
                }`}
              >
                {tech.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

