import { format } from 'date-fns';
import { Edit, Trash2, User, Calendar, Flag } from 'lucide-react';

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priority = task.priority || 'medium';

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-primary-600 dark:text-gray-400"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          {task.assignee && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span>{task.assignee.name}</span>
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          )}
        </div>

        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          <Flag className="inline w-3 h-3 mr-1" />
          {priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;