package pl.sdu.hr.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ETaskStatus status;

    private String description;

    private String estimatedWorkTime;

    private String estimatedTaskTimeEnd;

    private LocalDateTime startDate;

    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EPriorityStatus priorityStatus;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ETypeTask typeTask;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
