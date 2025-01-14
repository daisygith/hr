package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {

    private Long id;

    private String name;

    private List<TaskDto> task = new ArrayList<>();

    private List<EmployeeDto> employees = new ArrayList<>();
}
