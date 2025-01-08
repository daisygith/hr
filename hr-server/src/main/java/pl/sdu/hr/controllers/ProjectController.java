package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.ProjectDto;
import pl.sdu.hr.payload.dto.TaskDto;
import pl.sdu.hr.payload.response.MessageResponse;
import pl.sdu.hr.services.ProjectService;

import java.util.List;

@RestController
@RequestMapping("api/projects")
public class ProjectController {
    @Autowired
    ProjectService projectService;

    @GetMapping("")
    public List<ProjectDto> findAllProjects() {
        return projectService.findAllProjects();
    }

    @GetMapping("/{projectId}")
    public ProjectDto findProjectById(@PathVariable("projectId") Long projectId) throws Exception {
        ProjectDto projectDto = projectService.findProjectById(projectId);

        return projectDto;
    }

    @PostMapping("")
    public ProjectDto addProject(@RequestBody ProjectDto projectDto){
        ProjectDto dbProject = projectService.createProject(projectDto);

        return dbProject;
    }

    @DeleteMapping("/{projectId}")
    public MessageResponse deleteProjectById(@PathVariable("projectId") Long projectId) throws Exception {
        ProjectDto tempProject = projectService.findProjectById(projectId);

        if(tempProject == null) {
            throw new RuntimeException("Project is not fountd " + projectId);
        }

        projectService.deleteProjectById(projectId);

        return new MessageResponse("Delete project id" + projectId);
    }

    @PostMapping("/{projectId}/tasks")
    public TaskDto addTask(@RequestBody TaskDto taskDto, @PathVariable("projectId") Long projectId){
        TaskDto dbTask = projectService.createTask(taskDto, projectId);

        return dbTask;

    }

    @GetMapping("/{projectId}/tasks")
    public List<TaskDto> findAllTasks(@PathVariable("projectId") Long projectId) {
        return projectService.findTasksByProjectId(projectId);
    }

    @DeleteMapping("/{projectId}/tasks/{taskId}")
    public MessageResponse deleteTaskById(@PathVariable("projectId") Long projectId, @PathVariable("taskId") Long taskId) throws Exception {
        TaskDto tempTask = projectService.findTaskById(taskId);

        if(tempTask == null) {
            throw new RuntimeException("Project is not found" + taskId);
        }
            projectService.deleteTaskById(projectId,taskId);

            return new MessageResponse("Delete task by id" + taskId);
    }

}
