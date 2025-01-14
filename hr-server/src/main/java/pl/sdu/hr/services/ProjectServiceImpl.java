package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.ProjectMapper;
import pl.sdu.hr.mappers.TaskMapper;
import pl.sdu.hr.models.ETaskStatus;
import pl.sdu.hr.models.Employee;
import pl.sdu.hr.models.Project;
import pl.sdu.hr.models.Task;
import pl.sdu.hr.payload.dto.ProjectDto;
import pl.sdu.hr.payload.dto.TaskDto;
import pl.sdu.hr.payload.request.EmployeesRequest;
import pl.sdu.hr.repository.EmployeeRepository;
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

    @Autowired
    private EmployeeRepository employeeRepository;

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

        ProjectDto projectDto = ProjectMapper.mapProjectToProjectDtoWithEmployees(project);
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

    @Transactional
    @Override
    public ProjectDto updateProject(Long ProjectId, ProjectDto projectDto){
        Project project = projectRepository.findById(projectDto.getId()).orElseThrow();

        project.setName(projectDto.getName());

        projectRepository.save(project);

        ProjectDto projectDto1 = ProjectMapper.mapProjectToProjectDto(project);

        return projectDto1;
    }


    @Override
    public void deleteProjectById(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Transactional
    @Override
    public TaskDto createTask(TaskDto taskDto, Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        Task task = TaskMapper.mapTaskDtoToTask(taskDto);
        task.setStatus(ETaskStatus.NEW);
        task.setProject(project);

        taskRepository.save(task);

        TaskDto taskListDto = TaskMapper.mapTaskToTaskDto(task);

        return taskListDto;
    }

    @Override
    public List<TaskDto> findTasksByProjectId(Long projectId) {

        List<Task> taskList = taskRepository.findAllByProjectId(projectId);
        List<TaskDto> taskListDto = new ArrayList<>();

        taskList.forEach((Task item) -> {
            taskListDto.add(TaskMapper.mapTaskToTaskDto(item));
        });
        return taskListDto;
    }

    @Transactional
    @Override
    public void deleteTaskById(Long projectId, Long taskId){
        taskRepository.deleteById(taskId);
    }

    @Override
    public TaskDto findTaskById(Long takId) throws Exception {
        Task task = taskRepository.findById(takId).orElseThrow();

        TaskDto taskDto = TaskMapper.mapTaskToTaskDto(task);

        return taskDto;
    }

    @Transactional
    @Override
    public TaskDto updateTask(TaskDto taskDto, Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        Task task = TaskMapper.mapTaskDtoToTask(taskDto);
        task.setProject(project);

        taskRepository.save(task);

        TaskDto taskListDto = TaskMapper.mapTaskToTaskDto(task);

        return taskListDto;
    }

    @Transactional
    @Override
    public ProjectDto addEmployeesToProject(EmployeesRequest request, Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        List<Employee> employees = employeeRepository.findAllById(request.getEmployeesIds());
        project.getProjectEmployees().addAll(employees);
        projectRepository.save(project);

        ProjectDto projectDto = ProjectMapper.mapProjectToProjectDtoWithEmployees(project);

        return projectDto;
    }

    @Transactional
    @Override
    public void deleteEmployeeFromProject(Long projectId, Long employeeId){
        Project project = projectRepository.findById(projectId).orElseThrow();
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        project.getProjectEmployees().remove(employee);

        projectRepository.save(project);
    }
}
