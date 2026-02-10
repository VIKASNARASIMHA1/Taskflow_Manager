import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { Plus, ListTodo, Clock, CheckCircle } from 'lucide-react';

const columns = [
  { id: 'todo', title: 'To Do', icon: ListTodo, color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'inProgress', title: 'In Progress', icon: Clock, color: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'done', title: 'Done', icon: CheckCircle, color: 'bg-green-50 dark:bg-green-900/20' }
];

const TaskBoard = ({ tasks = [], projectId, onTaskUpdate, onTaskCreate, onTaskDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    done: tasks.filter(task => task.status === 'done')
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      // Update task status
      const updatedTask = tasks.find(task => task.id === draggableId);
      if (updatedTask) {
        onTaskUpdate(draggableId, { status: destination.droppableId });
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Board</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className={`rounded-lg ${column.color} p-4`}>
              <div className="flex items-center gap-2 mb-4">
                <column.icon className="w-5 h-5" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {column.title} ({groupedTasks[column.id].length})
                </h3>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] space-y-3 ${
                      snapshot.isDraggingOver ? 'bg-opacity-50' : ''
                    }`}
                  >
                    {groupedTasks[column.id].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onEdit={handleEdit}
                              onDelete={onTaskDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <TaskForm
          projectId={projectId}
          task={editingTask}
          onSubmit={(data) => {
            if (editingTask) {
              onTaskUpdate(editingTask.id, data);
            } else {
              onTaskCreate(data);
            }
            setShowForm(false);
            setEditingTask(null);
          }}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskBoard;