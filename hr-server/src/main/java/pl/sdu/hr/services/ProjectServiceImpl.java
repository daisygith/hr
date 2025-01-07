package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.ProjectMapper;
import pl.sdu.hr.mappers.TaskMapper;
import pl.sdu.hr.models.Project;
import pl.sdu.hr.models.Task;
import pl.sdu.hr.payload.dto.ProjectDto;
import pl.sdu.hr.payload.dto.TaskDto;
import pl.sdu.hr.repository.ProjectRepository;
import pl.sdu.hr.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<ProjectDto> findAllProjects() {
        List<Project> projectList = projectRepository.findAll();

        List<ProjectDto> projectListDto = new ArrayList<>();

        projectList.forEach((Project item) -> {
            projectListDto.add(ProjectMapper.mapProjectToProjectDto(item));
        });

        return projectListDto;
    }

    @Override
    public ProjectDto findProjectById(Long projectId) throws Exception {
        Project project = projectRepository.findById(projectId).orElseThrow();

        ProjectDto projectDto = ProjectMapper.mapProjectToProjectDto(project);
        return projectDto;
    }

    @Transactional
    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = ProjectMapper.mapProjectDtoToProject(projectDto);

        projectRepository.save(project);

        ProjectDto projectListDto = ProjectMapper.mapProjectToProjectDto(project);

        return projectListDto;
    }


    @Override
    public void deleteProjectById(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Transactional
    @Override
    public TaskDto createTask(TaskDto taskDto, Long projectId) {

        Task task = TaskMapper.mapTaskDtoToTask(taskDto);

        taskRepository.save(task);

        TaskDto taskListDto = TaskMapper.mapTaskToTaskDto(task);

        return taskListDto;
    }

    @Override
    public List<TaskDto> findAllTasks(Long projectId) {

        List<Task> taskList = taskRepository.findAll();
        List<TaskDto> taskListDto = new ArrayList<>();

        taskList.forEach((Task item) -> {
            taskListDto.add(TaskMapper.mapTaskToTaskDto(item));
        });
        return taskListDto;
    }
}
