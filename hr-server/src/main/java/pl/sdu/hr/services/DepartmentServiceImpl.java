package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.sdu.hr.mappers.DepartmentMapper;
import pl.sdu.hr.models.Department;
import pl.sdu.hr.payload.dto.DepartmentDto;
import pl.sdu.hr.repository.DepartmentRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentRepository departmentsRepository;

    @Override
    public List<DepartmentDto> findAllDepartments() {
        List<Department> departmentsList = departmentsRepository.findAll();

        List<DepartmentDto> departmentsListDto = new ArrayList<>();

        departmentsList.forEach((Department item) -> {
            departmentsListDto.add(DepartmentMapper.mapDepartmentToDepartmentDto(item));

        });

        return departmentsListDto;
    }
}
