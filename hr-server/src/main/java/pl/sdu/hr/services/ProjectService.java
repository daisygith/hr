package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.ProjectDto;
import pl.sdu.hr.payload.dto.TaskDto;
import pl.sdu.hr.payload.request.EmployeesRequest;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAllProjects();

    ProjectDto findProjectById(Long projectId) throws Exception;

    ProjectDto createProject (ProjectDto projectDto);

    ProjectDto updateProject (ProjectDto projectDto);

    void deleteProjectById(Long projectId);

    //task

    TaskDto createTask(TaskDto taskDto, Long projectId);

    List<TaskDto> findTasksByProjectId(Long projectId);

    void deleteTaskById(Long projectId, Long taskId);

    TaskDto findTaskById(Long taskId) throws Exception;

    TaskDto updateTask(TaskDto taskDto, Long projectId);

    ProjectDto addEmployeesToProject(EmployeesRequest request, Long projectId);

    void deleteEmployeeFromProject(Long projectId, Long EmployeeId);
}

