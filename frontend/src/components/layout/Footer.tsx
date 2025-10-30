export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-text-dark-body">
            © {currentYear} Bilal Abic. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/bilalabic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dark-body hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/bilalabic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dark-body hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/bilalabic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dark-body hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

