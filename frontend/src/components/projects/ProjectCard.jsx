import { Users, ListTodo, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ProjectCard = ({ project }) => {
  const completedTasks = project.tasks?.filter(task => task.status === 'done').length || 0;
  const totalTasks = project._count?.tasks || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color || '#3b82f6' }}
            />
            <h3 className="font-bold text-gray-900 dark:text-white">
              {project.name}
            </h3>
          </div>
          {project.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {totalTasks > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: project.color || '#3b82f6'
              }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ListTodo className="w-4 h-4" />
            <span>{totalTasks} tasks</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project._count?.members || 0} members</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(project.updatedAt), 'MMM d')}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;