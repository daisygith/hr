package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.sdu.hr.models.EPriorityStatus;
import pl.sdu.hr.models.ETaskStatus;
import pl.sdu.hr.models.ETypeTask;
import pl.sdu.hr.models.Project;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;

    private String name;

    private ETaskStatus status;

    private String description;

    private Long employeeId;

    private LocalDateTime estimatedWorkTime;

    private LocalDateTime estimatedTaskTimeEnd;

    private LocalDateTime startDate;

    private EPriorityStatus priorityStatus;

    private ETypeTask typeTask;

    private Project project;
}
