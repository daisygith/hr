package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {

    private Long id;

    private String name;

    private Long staffId;

    private String phone;

    private String position;

    private String department;

    private String typeOfContract;

    private String address;

    private String image;

    private Long departmentId;

}
