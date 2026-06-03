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

  // Creates new project
  function handleCreateNewProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectAction: PROJECT_ACTIONS.CREATED,
      };
    });
  }

  // Cancels the creation of a new project
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectAction: PROJECT_ACTIONS.NONE_SELECTED,
      };
    });
  }

  // Adds new project to projects array
  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = { id: projectId, ...projectData };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        projectAction: PROJECT_ACTIONS.NONE_SELECTED,
      };
    });
  }

  console.log(projectsState.projects);

  const content =
    projectsState.projectAction === PROJECT_ACTIONS.NONE_SELECTED ? (
      <NoProjectSelected onCreateNewProject={handleCreateNewProject} />
    ) : (
      <NewProject
        onAddNewPoject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onCreateNewProject={handleCreateNewProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
