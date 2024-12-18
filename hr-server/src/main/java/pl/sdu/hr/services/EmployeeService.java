package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.EmployeeDto;
import pl.sdu.hr.payload.dto.RegisterRequestTimeOffDto;
import pl.sdu.hr.payload.dto.RequestTimeOffDto;
import pl.sdu.hr.payload.request.SaveImageRequest;

import java.util.List;

public interface EmployeeService {

    List<EmployeeDto> findAll();

    EmployeeDto findById(Long employeeId) throws Exception;

    EmployeeDto create(EmployeeDto employeeDto);

    EmployeeDto update(EmployeeDto employeeDto);

    void deleteById(Long employeeId);

    RequestTimeOffDto createRequest(RegisterRequestTimeOffDto registerRequestTimeOffDto);

    List<RequestTimeOffDto> findAllRequest();

    RequestTimeOffDto findRequestForEmployeeById(Long employeeId) throws Exception;

    RequestTimeOffDto updateRequestForEmployeeById(RequestTimeOffDto requestTimeOffDto);

    void deleteRequestById(Long employeeId);

    EmployeeDto saveImageForEmployee(Long employeeId, SaveImageRequest request);

    void deleteImageForEmployee(Long employeeId);

    RequestTimeOffDto setStatusApproveById(Long requestId);

    RequestTimeOffDto setStatusRejectById(Long requestId);

    RequestTimeOffDto setStatusPendingById(Long requestId);

}
