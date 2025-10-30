import { useState, useEffect } from 'react';
import { Modal, Badge, Button } from '@/components/ui';
import { Project } from '@/types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0);
    }
  }, [isOpen]);

  if (!project) return null;

  const sortedImages = [...project.images].sort((a, b) => a.displayOrder - b.displayOrder);
  const selectedImage = sortedImages[selectedImageIndex] || sortedImages[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : sortedImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < sortedImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Body className="p-8 lg:p-12 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 text-text-dark-body hover:text-text-dark-heading hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            {selectedImage ? (
              <div className="group relative">
                <img
                  src={selectedImage.imageUrl}
                  alt={`${project.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg border border-white/10"
                />
                
                {/* Navigation Arrows */}
                {sortedImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/80 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/80 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-primary/30">image</span>
              </div>
            )}

            {/* Thumbnail Grid */}
            {sortedImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {sortedImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex
                        ? 'border-primary/50'
                        : 'border-white/10 hover:border-primary/30'
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6 flex flex-col">
            <div className="flex-grow space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-text-dark-heading tracking-tight">
                  {project.name}
                </h2>
                <p className="font-mono text-sm text-text-dark-body mt-2">
                  {new Date(project.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                  {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}`}
                </p>
              </div>

              {/* Description */}
              <p className="text-text-dark-body leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-bold text-text-dark-heading mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech.id} variant="primary" size="md">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contributors */}
              {project.contributors.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-text-dark-heading mb-3">
                    Contributors
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {project.contributors.map((contrib) => (
                      <span key={contrib.id} className="text-sm font-medium text-text-dark-body">
                        {contrib.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              {project.demoUrl && (
                <Button
                  variant="primary"
                  icon={<span className="material-symbols-outlined">visibility</span>}
                  onClick={() => window.open(project.demoUrl!, '_blank')}
                >
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="secondary"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                  }
                  onClick={() => window.open(project.githubUrl!, '_blank')}
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

