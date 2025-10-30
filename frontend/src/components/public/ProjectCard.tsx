import { Project } from '@/types';
import { Badge } from '@/components/ui';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0];

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* Project Image */}
      {primaryImage ? (
        <div 
          className="bg-cover bg-center h-48"
          style={{ backgroundImage: `url("${primaryImage.imageUrl}")` }}
        />
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-primary/30">image</span>
        </div>
      )}

      {/* Project Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-light-heading dark:text-text-dark-heading">
          {project.name}
        </h3>
        <p className="text-sm mt-1 text-text-light-body dark:text-text-dark-body line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech.id} variant="primary" size="sm">
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-primary text-black font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

