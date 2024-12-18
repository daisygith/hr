package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.EmployeeMapper;
import pl.sdu.hr.mappers.RequestTimeOffMapper;
import pl.sdu.hr.models.ERequestTimeOff;
import pl.sdu.hr.models.Employee;
import pl.sdu.hr.models.RequestTimeOff;
import pl.sdu.hr.payload.dto.EmployeeDto;
import pl.sdu.hr.payload.dto.RegisterRequestTimeOffDto;
import pl.sdu.hr.payload.dto.RequestTimeOffDto;
import pl.sdu.hr.payload.request.SaveImageRequest;
import pl.sdu.hr.repository.EmployeeRepository;
import pl.sdu.hr.repository.RequestTimeOffRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RequestTimeOffRepository requestTimeOffRepository;

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

    @Transactional
    @Override
    public RequestTimeOffDto createRequest(RegisterRequestTimeOffDto registerRequestTimeOffDto){

        Employee employee = employeeRepository.findById(registerRequestTimeOffDto.getEmployeeId()).orElseThrow();

        RequestTimeOff requestTimeOff = RequestTimeOff.builder()
                .employee(employee)
                .leaveType(registerRequestTimeOffDto.getLeaveType())
                .reason(registerRequestTimeOffDto.getReason())
                .startDate(registerRequestTimeOffDto.getStartDate())
                .endDate(registerRequestTimeOffDto.getEndDate())
                .build();

        requestTimeOffRepository.save(requestTimeOff);

        RequestTimeOffDto requestTimeOffDto = RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);

        return requestTimeOffDto;
    }

    @Override
    public List<RequestTimeOffDto> findAllRequest() {
        List<RequestTimeOff> requestTimeOffList = requestTimeOffRepository.findAll();

        List<RequestTimeOffDto> requestTimeOffListDto = new ArrayList<>();

        requestTimeOffList.forEach((RequestTimeOff item) ->{
            requestTimeOffListDto.add(RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(item));
        });

        return requestTimeOffListDto;
    }


    @Override
    public RequestTimeOffDto findRequestForEmployeeById(Long employeeId) throws Exception{
        RequestTimeOff requestTimeOff = requestTimeOffRepository.findById(employeeId).orElseThrow();

        RequestTimeOffDto requestTimeOffDto = RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);
        return requestTimeOffDto;
    }

    @Transactional
    @Override
    public RequestTimeOffDto updateRequestForEmployeeById(RequestTimeOffDto requestTimeOffDto) {
        Employee employee = employeeRepository.findById(requestTimeOffDto.getEmployeeId()).orElseThrow();

        RequestTimeOff requestTimeOff = RequestTimeOff.builder()
                .employee(employee)
                .id(requestTimeOffDto.getId())
                .leaveType(requestTimeOffDto.getLeaveType())
                .reason(requestTimeOffDto.getReason())
                .startDate(requestTimeOffDto.getStartDate())
                .endDate(requestTimeOffDto.getEndDate())
                .build();

        requestTimeOffRepository.save(requestTimeOff);

        RequestTimeOffDto dbrequestTimeOffDto = RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);

        return dbrequestTimeOffDto;
    }

    @Transactional
    @Override
    public void deleteRequestById(Long employeeId){
        requestTimeOffRepository.deleteById(employeeId);
    }


    @Transactional
    @Override
    public EmployeeDto saveImageForEmployee(Long employeeId, SaveImageRequest request){
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        employee.setImage(request.getUrl());
        employeeRepository.save(employee);
        return EmployeeMapper.mapEmployeeToEmployeeDto(employee);


    }

    @Transactional
    @Override
    public void deleteImageForEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        employee.setImage(null);
        employeeRepository.save(employee);
    }

    @Transactional
    @Override
    public RequestTimeOffDto setStatusApproveById(Long requestId){
        RequestTimeOff requestTimeOff = requestTimeOffRepository.findById(requestId).orElseThrow();
        requestTimeOff.setStatus(ERequestTimeOff.APPROVE);
        requestTimeOffRepository.save(requestTimeOff);

        return RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);}

    @Transactional
    @Override
    public RequestTimeOffDto setStatusRejectById(Long requestId){
        RequestTimeOff requestTimeOff = requestTimeOffRepository.findById(requestId).orElseThrow();
        requestTimeOff.setStatus(ERequestTimeOff.REJECT);
        requestTimeOffRepository.save(requestTimeOff);

        return RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);
            }

            @Transactional
    @Override
    public RequestTimeOffDto setStatusDraftById(Long requestId){
        RequestTimeOff requestTimeOff = requestTimeOffRepository.findById(requestId).orElseThrow();
        requestTimeOff.setStatus(ERequestTimeOff.DRAFT);
        requestTimeOffRepository.save(requestTimeOff);

        return RequestTimeOffMapper.mapRequestTimeOffToRequestTimeOffDto(requestTimeOff);
            }

}
