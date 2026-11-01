import { useState } from "react";

import AddTaskModel from "./AddTaskModel";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Complete the project",
    description: "Finish the project by the end of the week",
    priority: "High",
    tags: ["Work", "Urgent"],
    is_favorite: true,
  };

  const [tasks, setTasks] = useState([defaultTasks]);
  const [showAddModel, setShowAddModel] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        }),
      );
    }

    setShowAddModel(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModel(true);
  }

  function handleDeleteTask(taskId) {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }

  function handleDeleteAllTasks() {
    setTasks([]);
  }

  function handleCloseAddModel() {
    setShowAddModel(false);
    setTaskToUpdate(null);
  }

  function handleFavoriteToggle(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, is_favorite: !task.is_favorite };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleSearch(searchTerm) {
    const filteredTasks = tasks.filter((task) => {
      task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setTasks([...filteredTasks]);
  }

  return (
    <section className="mb-20 relative" id="tasks">
      {showAddModel && (
        <AddTaskModel
          onSave={handleAddEditTask}
          onClose={handleCloseAddModel}
          taskToUpdate={taskToUpdate}
        ></AddTaskModel>
      )}
      <div className="container">
        <SearchTask onSearch={handleSearch}></SearchTask>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModel(true)}
            deleteAllClick={handleDeleteAllTasks}
          ></TaskActions>

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFavoriteToggle={handleFavoriteToggle}
            ></TaskList>
          ) : (
            <NoTaskFound></NoTaskFound>
          )}
        </div>
      </div>
    </section>
  );
}
