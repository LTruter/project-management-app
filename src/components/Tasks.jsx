import NewTask from "./NewTask";

function Tasks({ tasks, onAddTask, onDeleteTask, project }) {
  // Returns an array of tasks that have the selected project's id
  const projectTasks = tasks.filter((task) => task.projectId === project.id);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAddTask={onAddTask} />

      {projectTasks.length > 0 ? (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {projectTasks.map(
            (projectTasks) =>
              projectTasks.projectId === project.id && (
                <li key={projectTasks.id} className="flex justify-between my-4">
                  <span>{projectTasks.text}</span>
                  <button
                    className="text-stone-700 hover:text-red-500"
                    onClick={() => onDeleteTask(projectTasks.id)}
                  >
                    Clear
                  </button>
                </li>
              ),
          )}
        </ul>
      ) : (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
    </section>
  );
}

export default Tasks;
