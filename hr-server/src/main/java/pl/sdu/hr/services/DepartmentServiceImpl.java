package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Override
    public DepartmentDto findById(Long departmentId) throws Exception {
        Department department = departmentsRepository.findById(departmentId).orElseThrow();

        DepartmentDto departmentDto = DepartmentMapper.mapDepartmentToDepartmentDto(department);
        return departmentDto;
    }

    @Transactional
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapDepartmentDtoToDepartment(departmentDto);

        departmentsRepository.save(department);

        DepartmentDto departmentListDto = DepartmentMapper.mapDepartmentToDepartmentDto(department);

        return departmentListDto;
    }

    @Transactional
    @Override
    public DepartmentDto updateDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapDepartmentDtoToDepartment(departmentDto);

        departmentsRepository.save(department);

        DepartmentDto departmentListDto = DepartmentMapper.mapDepartmentToDepartmentDto(department);

        return departmentListDto;
    }

    @Override
    public void deleteDepartmentById(Long departmentId) {
        departmentsRepository.deleteById(departmentId);
    }


}
