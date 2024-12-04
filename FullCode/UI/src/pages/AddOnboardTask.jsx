import React, { useState, useEffect } from 'react';

const OnboardingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [newTask, setNewTask] = useState({
    taskTitle: '',
    taskDescription: '',
    startDate: '',
    endDate: '',
    taskPdf: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Fetch onboarding tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/getOnboardingTasks');
      const result = await response.json();

      if (response.ok && Array.isArray(result.tasks)) {
        setTasks(result.tasks);
      } else {
        setMessage(result.message || 'Failed to fetch tasks.');
      }
    } catch (error) {
      setMessage('Error occurred while fetching tasks.');
    }
  };

  // Handle form inputs for adding or editing
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const targetTask = isEditing ? editTask : newTask;

    (isEditing ? setEditTask : setNewTask)((prevTask) => ({
      ...prevTask,
      [name]: files ? files[0] : value,
    }));
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newTask).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await fetch('/api/onTask', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setTasks([...tasks, result.data]);
        setNewTask({ taskTitle: '', taskDescription: '', startDate: '', endDate: '', taskPdf: null });
        setMessage('Task added successfully!');
      } else {
        setMessage(result.message || 'Failed to add task.');
      }
    } catch (error) {
      setMessage('Error occurred while adding task.');
    }
  };

  // Edit a task
  const editCurrentTask = (task) => {
    setEditTask({ ...task });
    setIsEditing(true);
  };

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/editOnboardingTask/${editTask.taskTitle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editTask),
      });

      const result = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.taskTitle === editTask.taskTitle ? editTask : task))
        );
        setIsEditing(false);
        setEditTask(null);
        setMessage('Task updated successfully!');
      } else {
        setMessage(result.message || 'Failed to update task.');
      }
    } catch (error) {
      setMessage('Error occurred while updating task.');
    }
  };

  // Delete a task
  const deleteTask = async (taskTitle) => {
    try {
      const response = await fetch(`/api/deleteOnboardingTask/${taskTitle}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
        setTasks(tasks.filter((task) => task.taskTitle !== taskTitle));
        setMessage('Task deleted successfully!');
      } else {
        setMessage(result.message || 'Failed to delete task.');
      }
    } catch (error) {
      setMessage('Error occurred while deleting task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Onboarding Tasks</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Add/Edit Task Form */}
      <form className="mb-6 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto" onSubmit={isEditing ? updateTask : addTask}>
        <div className="grid gap-4 mb-4">
          <input
            type="text"
            name="taskTitle"
            placeholder="Task Title"
            value={isEditing ? editTask?.taskTitle : newTask.taskTitle}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
            readOnly={isEditing} // Task title is not editable
          />
          <textarea
            name="taskDescription"
            placeholder="Task Description"
            value={isEditing ? editTask?.taskDescription : newTask.taskDescription}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="startDate"
            value={isEditing ? editTask?.startDate : newTask.startDate}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="endDate"
            value={isEditing ? editTask?.endDate : newTask.endDate}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />

          {!isEditing && (
            <input
              type="file"
              name="taskPdf"
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          )}
        </div>
        <button
          type="submit"
          className={`py-2 px-4 rounded ${isEditing ? 'bg-green-500 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'
            } text-white`}
        >
          {isEditing ? 'Save Changes' : 'Add Task'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditTask(null);
            }}
            className="ml-4 py-2 px-4 rounded bg-gray-500 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display Tasks */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-white">Task List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div key={task.taskTitle} className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-bold">{task.taskTitle}</h3>
              <p>{task.taskDescription}</p>
              <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
                   
              {task.taskPdf && (
                <a
                  href={`http://api:3000/${task.taskPdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View PDF
                </a>
              )}
              <div className="mt-4">
                <button
                  onClick={() => editCurrentTask(task)}
                  className="mr-2 text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.taskTitle)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default OnboardingTasks;
