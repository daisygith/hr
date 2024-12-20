package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    List<DepartmentDto> findAllDepartments();
}
