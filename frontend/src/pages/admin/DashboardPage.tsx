import { AdminLayout } from '@/components/layout/AdminLayout';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardPage() {
  const { admin } = useAuth();
  const { data: projectsData } = useProjects(1, 100); // Get all projects for stats

  const stats = [
    {
      label: 'Total Projects',
      value: projectsData?.pagination?.total || 0,
      icon: 'folder',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Published',
      value: projectsData?.projects?.filter((p) => p.isPublished).length || 0,
      icon: 'visibility',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Drafts',
      value: projectsData?.projects?.filter((p) => !p.isPublished).length || 0,
      icon: 'draft',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Total Images',
      value: projectsData?.projects?.reduce((acc, p) => acc + p.images.length, 0) || 0,
      icon: 'image',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-black text-text-dark-heading">
            Welcome back, {admin?.name}! 👋
          </h1>
          <p className="text-text-dark-body mt-1">
            Here's an overview of your portfolio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-dark border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-dark-body mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-text-dark-heading">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="bg-surface-dark border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-text-dark-heading mb-4">
            Recent Projects
          </h2>
          {projectsData && projectsData.projects && projectsData.projects.length > 0 ? (
            <div className="space-y-3">
              {projectsData.projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-background-dark rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        folder
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-dark-heading">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-dark-body">
                        {project.technologies.length} technologies
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      project.isPublished
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {project.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-dark-body">
              <span className="material-symbols-outlined text-5xl mb-2 opacity-30">
                folder_off
              </span>
              <p>No projects yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

