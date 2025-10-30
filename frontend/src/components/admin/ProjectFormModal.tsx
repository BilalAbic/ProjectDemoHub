import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Input, Textarea } from '@/components/ui';
import { useCreateProject, useUpdateProject } from '@/hooks/useAdminProjects';
import { useTechnologies } from '@/hooks/useProjects';
import { Project } from '@/types';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

interface ProjectFormInputs {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  isPublished: boolean;
  technologyIds: string[];
  images?: FileList;
}

export function ProjectFormModal({ isOpen, onClose, project }: ProjectFormModalProps) {
  const isEditing = !!project;
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const { data: technologies } = useTechnologies();

  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInputs>({
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: undefined,
      demoUrl: undefined,
      githubUrl: undefined,
      isPublished: false,
      technologyIds: [],
    },
  });

  // Initialize form values and selected technologies when project changes
  useEffect(() => {
    if (project) {
      // Reset form with project data
      reset({
        name: project.name,
        description: project.description,
        startDate: project.startDate.split('T')[0],
        endDate: project.endDate ? project.endDate.split('T')[0] : undefined,
        demoUrl: project.demoUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        isPublished: project.isPublished,
        technologyIds: project.technologies.map((t) => t.id),
      });
      setSelectedTechIds(project.technologies.map((t) => t.id));
    } else {
      // Reset form to empty state for new project
      reset({
        name: '',
        description: '',
        startDate: '',
        endDate: undefined,
        demoUrl: undefined,
        githubUrl: undefined,
        isPublished: false,
        technologyIds: [],
      });
      setSelectedTechIds([]);
    }
  }, [project, reset]);

  // Watch for image changes
  const watchImages = watch('images');
  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const previews: string[] = [];
      Array.from(watchImages).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === watchImages.length) {
            setPreviewImages(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviewImages([]);
    }
  }, [watchImages]);

  const toggleTechnology = (techId: string) => {
    setSelectedTechIds((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const onSubmit = async (data: ProjectFormInputs) => {
    try {
      console.log('📤 Submitting form data:', { ...data, selectedTechIds, isEditing });
      
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      if (data.endDate) formData.append('endDate', data.endDate);
      if (data.demoUrl) formData.append('demoUrl', data.demoUrl);
      if (data.githubUrl) formData.append('githubUrl', data.githubUrl);
      formData.append('isPublished', String(data.isPublished));

      // Add technologies
      selectedTechIds.forEach((techId) => {
        formData.append('technologyIds[]', techId);
      });

      // Debug: Log FormData contents
      console.log('📦 FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      // Add images (only for new projects)
      if (!isEditing && data.images) {
        Array.from(data.images).forEach((file) => {
          formData.append('images', file);
        });
      }

      if (isEditing && project) {
        console.log('🔄 Updating project:', project.id);
        await updateProject.mutateAsync({ id: project.id, projectData: formData });
        console.log('✅ Project updated successfully');
      } else {
        console.log('➕ Creating new project');
        await createProject.mutateAsync(formData);
        console.log('✅ Project created successfully');
      }

      reset();
      setSelectedTechIds([]);
      setPreviewImages([]);
      onClose();
    } catch (error: any) {
      console.error('❌ Failed to save project:', error);
      alert(error.response?.data?.error?.message || 'Failed to save project');
    }
  };

  const handleClose = () => {
    reset();
    setSelectedTechIds([]);
    setPreviewImages([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Project' : 'Add New Project'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Name *"
              placeholder="My Awesome Project"
              error={errors.name?.message}
              {...register('name', { required: 'Project name is required' })}
            />

            <div className="flex items-center space-x-4 pt-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                  {...register('isPublished')}
                />
                <span className="text-sm font-medium text-text-dark-body">
                  Publish immediately
                </span>
              </label>
            </div>
          </div>

          <Textarea
            label="Description *"
            placeholder="Describe your project..."
            rows={4}
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
          />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date *"
              type="date"
              error={errors.startDate?.message}
              {...register('startDate', { required: 'Start date is required' })}
            />
            <Input
              label="End Date (optional)"
              type="date"
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Demo URL (optional)"
              type="url"
              placeholder="https://demo.example.com"
              error={errors.demoUrl?.message}
              {...register('demoUrl')}
            />
            <Input
              label="GitHub URL (optional)"
              type="url"
              placeholder="https://github.com/username/repo"
              error={errors.githubUrl?.message}
              {...register('githubUrl')}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-text-dark-body mb-3">
              Technologies *
            </label>
            <div className="flex flex-wrap gap-2">
              {technologies?.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => toggleTechnology(tech.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedTechIds.includes(tech.id)
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-white/5 text-text-dark-body border-2 border-white/10 hover:border-white/20'
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
            {selectedTechIds.length === 0 && (
              <p className="mt-2 text-xs text-red-400">Select at least one technology</p>
            )}
          </div>

          {/* Images */}
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-text-dark-body mb-3">
                Project Images (optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-symbols-outlined text-4xl text-text-dark-body/50 mb-2">
                      cloud_upload
                    </span>
                    <p className="mb-2 text-sm text-text-dark-body">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-text-dark-body/70">PNG, JPG, WEBP (MAX. 5MB each)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    {...register('images')}
                  />
                </label>
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isEditing && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-blue-400">
                To manage images for this project, use the image management section after saving.
              </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || selectedTechIds.length === 0}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

