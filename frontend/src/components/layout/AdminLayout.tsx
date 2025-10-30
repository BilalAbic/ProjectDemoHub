import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: 'dashboard',
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: 'folder',
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex h-screen bg-background-dark overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-surface-dark border-r border-white/10">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <h1 className="text-xl font-black text-primary font-mono tracking-tighter">
              DemoHub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-dark-body hover:bg-white/5 hover:text-text-dark-heading'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 px-4 py-3 mb-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {admin?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-dark-heading truncate">
                  {admin?.name}
                </p>
                <p className="text-xs text-text-dark-body truncate">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-dark-body hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside className="w-64 h-full bg-surface-dark">
            {/* Same content as desktop sidebar */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
                <h1 className="text-xl font-black text-primary font-mono tracking-tighter">
                  DemoHub
                </h1>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-text-dark-body hover:text-text-dark-heading"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary/20 text-primary'
                        : 'text-text-dark-body hover:bg-white/5 hover:text-text-dark-heading'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {admin?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-dark-heading truncate">
                      {admin?.name}
                    </p>
                    <p className="text-xs text-text-dark-body truncate">{admin?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-dark-body hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Mobile */}
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-surface-dark border-b border-white/10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-text-dark-body hover:text-text-dark-heading"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-lg font-black text-primary font-mono tracking-tighter">
            DemoHub
          </h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

