package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Project;
import pl.sdu.hr.payload.dto.ProjectDto;

import java.util.stream.Collectors;

public class ProjectMapper {

    public static ProjectDto mapProjectToProjectDto (Project project){
        ProjectDto projectDto = ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .task(project.getTask() != null ?
                        project.getTask()
                                .stream()
                                .map(TaskMapper::mapTaskToTaskDto)
                                .collect(Collectors.toList())
                        : null)
                .build();

        return projectDto;
    }


    public static ProjectDto mapProjectToProjectDtoWithEmployees (Project project){
        ProjectDto projectDto = ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .task(project.getTask() != null ?
                        project.getTask()
                                .stream()
                                .map(TaskMapper::mapTaskToTaskDto)
                                .collect(Collectors.toList())
                        : null)
                .employees(project.getProjectEmployees() != null ?
                        project.getProjectEmployees()
                                .stream()
                                .map(employee -> EmployeeMapper.mapEmployeeToEmployeeDto(employee))
                                .collect(Collectors.toList())
                        : null)
                .build();

        return projectDto;
    }

    public static Project mapProjectDtoToProject(ProjectDto projectDto){
        Project project = Project.builder()
                .id(projectDto.getId())
                .name(projectDto.getName())
                .task(projectDto.getTask() != null ?
                        projectDto.getTask()
                                .stream()
                                .map(TaskMapper::mapTaskDtoToTask)
                                .collect(Collectors.toList())
                        : null)
                .build();

        return project;
    }
}
