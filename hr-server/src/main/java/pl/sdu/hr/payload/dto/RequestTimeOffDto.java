package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.sdu.hr.models.ERequestTimeOff;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestTimeOffDto {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private String leaveType;

    private String reason;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private long days;

    private ERequestTimeOff status;

    private String image;

}
