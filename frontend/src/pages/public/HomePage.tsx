import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectCard } from '@/components/public/ProjectCard';
import { ProjectDetailModal } from '@/components/public/ProjectDetailModal';
import { Pagination } from '@/components/ui';
import { useProjects, useTechnologies } from '@/hooks/useProjects';
import { Project } from '@/types';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: technologiesData } = useTechnologies();
  const { data: projectsData, isLoading, error } = useProjects(
    currentPage, 
    8, 
    selectedTech === 'all' ? undefined : selectedTech
  );

  const handleTechSelect = (techId: string) => {
    setSelectedTech(techId);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear after animation
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar 
        selectedTech={selectedTech}
        onTechSelect={handleTechSelect}
        technologies={technologiesData || []}
      />

      <main className="w-full p-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-text-light-heading dark:text-text-dark-heading text-4xl font-black tracking-tight">
              Projects
            </h1>
            <p className="text-text-light-body dark:text-text-dark-body mt-1">
              A curated collection of my latest work and experiments.
            </p>
          </header>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-text-dark-body">Loading projects...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
              <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
              <p className="text-red-400">Failed to load projects. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && projectsData && projectsData.projects?.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-text-dark-body/30 mb-4">folder_off</span>
              <p className="text-text-dark-body">No projects found.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && !error && projectsData && projectsData.projects?.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projectsData.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {projectsData.pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={projectsData.pagination.totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

