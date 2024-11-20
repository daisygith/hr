package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestTimeOffDto {

    private Long employeeId;

    private String leaveType;

    private String reason;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

}
