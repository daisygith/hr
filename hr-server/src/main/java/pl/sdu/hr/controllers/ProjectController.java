package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.ProjectDto;
import pl.sdu.hr.payload.dto.TaskDto;
import pl.sdu.hr.payload.request.EmployeesRequest;
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

    @PutMapping("/{projectId}")
    public ProjectDto updateProject(@PathVariable("projectId") Long projectId, @RequestBody ProjectDto projectDto){
        ProjectDto dbProject = projectService.updateProject(projectId,projectDto);

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

    @GetMapping("/{projectId}/tasks/{taskId}")
    public TaskDto findTaskById(@PathVariable("projectId") Long projectId, @PathVariable("taskId") Long taskId) throws Exception{
        TaskDto taskDto = projectService.findTaskById(taskId);

        return taskDto;
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

    @PutMapping("/{projectId}/tasks/{taskId}")
    public TaskDto updateTaskById(@RequestBody TaskDto taskDto, @PathVariable("projectId") Long projectId, @PathVariable String taskId){
        TaskDto dbTask = projectService.updateTask(taskDto, projectId);

        return dbTask;

    }

    @PostMapping("/{projectId}/employees")
    public ProjectDto addEmployeesToProject(@RequestBody EmployeesRequest request, @PathVariable("projectId") Long projectId){
        ProjectDto project = projectService.addEmployeesToProject(request, projectId);

        return project;

    }

    @DeleteMapping("/{projectId}/employees/{employeeId}")
    public MessageResponse deleteEmployeeFromProject(@PathVariable("projectId") Long projectId, @PathVariable("employeeId") Long employeeId) throws Exception {
        ProjectDto tempProject = projectService.findProjectById(projectId);

        if(tempProject == null) {
            throw new RuntimeException("Project is not fountd " + projectId);
        }

        projectService.deleteEmployeeFromProject(projectId,employeeId);

        return new MessageResponse("Delete project id" + projectId);
    }
}
