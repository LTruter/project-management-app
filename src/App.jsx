import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const PROJECT_ACTIONS = {
    NONE_SELECTED: "NONE_SELECTED",
    SELECTED: "SELECTED",
    CREATED: "CREATED",
  };

  const [projectsState, setProjectsState] = useState({
    projectAction: PROJECT_ACTIONS.NONE_SELECTED,
    selectedProject: undefined,
    projects: [],
  });

  function handleCreateNewProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectAction: PROJECT_ACTIONS.CREATED,
      };
    });
  }

  function handleAddProject(projectData) {
    const newProject = { id: Math.random(), ...projectData };

    setProjectsState((prevState) => {
      return { ...prevState, projects: [...prevState.projects, newProject] };
    });
  }

  console.log(projectsState.projects);

  const content =
    projectsState.projectAction === PROJECT_ACTIONS.NONE_SELECTED ? (
      <NoProjectSelected onCreateNewProject={handleCreateNewProject} />
    ) : (
      <NewProject onAddNewPoject={handleAddProject} />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onCreateNewProject={handleCreateNewProject} />
      {content}
    </main>
  );
}

export default App;
