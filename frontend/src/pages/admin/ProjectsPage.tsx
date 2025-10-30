import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button, Badge } from '@/components/ui';
import { useAdminProjects, useDeleteProject } from '@/hooks/useAdminProjects';
import { Project } from '@/types';
import { ProjectFormModal } from '@/components/admin/ProjectFormModal';

export function ProjectsPage() {
  const { data: projects, isLoading } = useAdminProjects();
  const deleteProject = useDeleteProject();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-text-dark-heading">Projects</h1>
            <p className="text-text-dark-body mt-1">Manage your portfolio projects</p>
          </div>
          <Button
            variant="primary"
            icon={<span className="material-symbols-outlined">add</span>}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Project
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Projects Table */}
        {!isLoading && projects && projects.length > 0 && (
          <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-dark border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-dark-heading uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-dark-heading uppercase tracking-wider">
                      Technologies
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-dark-heading uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-dark-heading uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-text-dark-heading uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-text-dark-heading">{project.name}</p>
                          <p className="text-sm text-text-dark-body line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 2).map((tech) => (
                            <Badge key={tech.id} variant="primary" size="sm">
                              {tech.name}
                            </Badge>
                          ))}
                          {project.technologies.length > 2 && (
                            <Badge variant="secondary" size="sm">
                              +{project.technologies.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={project.isPublished ? 'success' : 'warning'}
                          size="sm"
                        >
                          {project.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-dark-body">
                          {project.images.length} images
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-text-dark-body hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            disabled={deletingProjectId === project.id}
                            className="p-2 text-text-dark-body hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects && projects.length === 0 && (
          <div className="bg-surface-dark border border-white/10 rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-text-dark-body/30 mb-4">
              folder_off
            </span>
            <h3 className="text-lg font-bold text-text-dark-heading mb-2">No projects yet</h3>
            <p className="text-text-dark-body mb-6">Get started by creating your first project</p>
            <Button
              variant="primary"
              icon={<span className="material-symbols-outlined">add</span>}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <ProjectFormModal
        isOpen={isAddModalOpen || !!editingProject}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
      />
    </AdminLayout>
  );
}

