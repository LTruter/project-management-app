import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

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

  // Displays selected project if a matching project id is found
  function handleSelectProject(id) {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === id,
    );

    const projectAction = selectedProject
      ? PROJECT_ACTIONS.SELECTED
      : PROJECT_ACTIONS.NONE_SELECTED;

    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: selectedProject,
        projectAction: projectAction,
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

  // Cancels the creation of a new project
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectAction: PROJECT_ACTIONS.NONE_SELECTED,
      };
    });
  }

  let content;

  if (projectsState.projectAction === PROJECT_ACTIONS.SELECTED) {
    content = <SelectedProject project={projectsState.selectedProject} />;
  } else if (projectsState.projectAction === PROJECT_ACTIONS.CREATED) {
    content = (
      <NewProject
        onAddNewPoject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );
  } else {
    content = <NoProjectSelected onCreateNewProject={handleCreateNewProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onCreateNewProject={handleCreateNewProject}
        onSelectedProject={handleSelectProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProject?.id}
      />
      {content}
    </main>
  );
}

export default App;
