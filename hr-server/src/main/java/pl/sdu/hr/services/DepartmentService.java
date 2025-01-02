package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    List<DepartmentDto> findAllDepartments();

    DepartmentDto findById(Long departmentId) throws Exception;

    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto updateDepartment(DepartmentDto departmentDto);

    void deleteDepartmentById(Long departmentId);
}
