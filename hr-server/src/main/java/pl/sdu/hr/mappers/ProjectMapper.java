package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Project;
import pl.sdu.hr.payload.dto.ProjectDto;

public class ProjectMapper {

    public static ProjectDto mapProjectToProjectDto (Project project){
        ProjectDto projectDto = ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .task(project.getTask())
                .build();

        return projectDto;
    }

    public static Project mapProjectDtoToProject(ProjectDto projectDto){
        Project project = Project.builder()
                .id(projectDto.getId())
                .name(projectDto.getName())
                .task(projectDto.getTask())
                .build();

        return project;
    }
}
