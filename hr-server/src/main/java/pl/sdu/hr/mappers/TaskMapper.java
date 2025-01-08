package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Task;
import pl.sdu.hr.payload.dto.TaskDto;

public class TaskMapper {

    public static TaskDto mapTaskToTaskDto(Task task){
        TaskDto taskDto = TaskDto.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .status(task.getStatus())
                .employeeId(task.getEmployeeId())
                .estimatedWorkTime(task.getEstimatedWorkTime())
                .estimatedTaskTimeEnd(task.getEstimatedTaskTimeEnd())
                .startDate(task.getStartDate())
                .priorityStatus(task.getPriorityStatus())
                .typeTask(task.getTypeTask())
                .build();

        return taskDto;
    }

    public static Task mapTaskDtoToTask(TaskDto taskDto){
        Task task = Task.builder()
                .id(taskDto.getId())
                .name(taskDto.getName())
                .description(taskDto.getDescription())
                .status(taskDto.getStatus())
                .employeeId(taskDto.getEmployeeId())
                .estimatedWorkTime(taskDto.getEstimatedWorkTime())
                .estimatedTaskTimeEnd(taskDto.getEstimatedTaskTimeEnd())
                .startDate(taskDto.getStartDate())
                .priorityStatus(taskDto.getPriorityStatus())
                .typeTask(taskDto.getTypeTask())
                .build();

        return task;
    }
}
