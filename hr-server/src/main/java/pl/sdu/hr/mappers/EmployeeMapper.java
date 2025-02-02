package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Employee;
import pl.sdu.hr.payload.dto.EmployeeDto;

public class EmployeeMapper {
    public static EmployeeDto mapEmployeeToEmployeeDto(Employee employee) {
        EmployeeDto employeeDto = EmployeeDto.builder()
                .id(employee.getId())
                .name(employee.getName())
                .staffId(employee.getUser() != null ? employee.getUser().getId() : null)
                .phone(employee.getPhone())
                .position(employee.getPosition())
                .department(employee.getDepartment())
                .typeOfContract(employee.getTypeOfContract())
                .address(employee.getAddress())
                .image(employee.getImage())
                .departmentId(employee.getDepartmentId())
                .build();

        return employeeDto;
    }

    public static Employee mapEmployeeDtoToEmployee(EmployeeDto employeeDto){
        Employee employee = Employee.builder()
                .id(employeeDto.getId())
                .name(employeeDto.getName())
                .phone(employeeDto.getPhone())
                .position(employeeDto.getPosition())
                .department(employeeDto.getDepartment())
                .typeOfContract(employeeDto.getTypeOfContract())
                .address(employeeDto.getAddress())
                .image(employeeDto.getImage())
                .departmentId(employeeDto.getDepartmentId())
                .build();

        return employee;
    }
}
