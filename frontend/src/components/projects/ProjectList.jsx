import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { FolderPlus } from 'lucide-react';

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No projects yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create your first project to get started
        </p>
        <Link
          to="/projects/new"
          className="btn-primary inline-flex items-center gap-2"
        >
          <FolderPlus className="w-5 h-5" />
          Create First Project
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;