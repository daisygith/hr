package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Department;
import pl.sdu.hr.payload.dto.DepartmentDto;

public class DepartmentMapper {

    public static DepartmentDto mapDepartmentToDepartmentDto (Department department) {
        DepartmentDto departmentDto = DepartmentDto.builder()
                .id(department.getId())
                .name(department.getName())
                .build();

        return departmentDto;
    }

    public static Department mapDepartmentDtoToDepartment(DepartmentDto departmentDto){
        Department department = Department.builder()
                .id(departmentDto.getId())
                .name(departmentDto.getName())
                .build();

        return department;
    }
}
