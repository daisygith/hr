package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAllProjects();

    ProjectDto findProjectById(Long projectId) throws Exception;

    ProjectDto createProject (ProjectDto projectDto);

    void deleteProjectById(Long projectId);
}

