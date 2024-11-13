package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.EmployeeMapper;
import pl.sdu.hr.models.Employee;
import pl.sdu.hr.payload.dto.EmployeeDto;
import pl.sdu.hr.repository.EmployeeRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDto> findAll() {
        List<Employee> employeeList = employeeRepository.findAll();

        List<EmployeeDto> employeeListDto = new ArrayList<>();

        employeeList.forEach((Employee item) -> {
            employeeListDto.add(EmployeeMapper.mapEmployeeToEmployeeDto(item));
        });

        return employeeListDto;
    }

    @Override
    public EmployeeDto findById(Long employeeId) throws Exception{

        Employee employee = employeeRepository.findById(employeeId).orElseThrow();

        EmployeeDto employeeDto = EmployeeMapper.mapEmployeeToEmployeeDto(employee);

        return employeeDto;

    }

    @Transactional
    @Override
    public EmployeeDto create(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapEmployeeDtoToEmployee(employeeDto);

        employeeRepository.save(employee);

        EmployeeDto employeeListDto = EmployeeMapper.mapEmployeeToEmployeeDto(employee);

        return employeeListDto;

    }

    @Transactional
    @Override
    public EmployeeDto update(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapEmployeeDtoToEmployee(employeeDto);

        employeeRepository.save(employee);

        EmployeeDto employeeListDto = EmployeeMapper.mapEmployeeToEmployeeDto(employee);

        return employeeListDto;

    }

    @Transactional
    @Override
    public void deleteById(Long employeeId){

        employeeRepository.deleteById(employeeId);

    }


}
