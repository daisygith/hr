package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.EmployeeDto;
import pl.sdu.hr.payload.dto.RegisterRequestTimeOffDto;
import pl.sdu.hr.payload.dto.RequestTimeOffDto;
import pl.sdu.hr.payload.request.SaveImageRequest;
import pl.sdu.hr.payload.response.MessageResponse;
import pl.sdu.hr.services.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("")
    public List<EmployeeDto> findAll(){
        return employeeService.findAll();
    }

    @GetMapping("/{employeeId}")
    public EmployeeDto getEmployee(@PathVariable("employeeId") Long employeeId) throws Exception {
        EmployeeDto employeeDto = employeeService.findById(employeeId);

        return employeeDto;
    }

    @PostMapping("")
    public EmployeeDto addEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto dbEmployee = employeeService.create(employeeDto);

        return dbEmployee;
    }

    @PutMapping("/{employeeId}")
    public EmployeeDto updateEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto dbEmployee = employeeService.update(employeeDto);

        return dbEmployee;
    }

    @DeleteMapping("/{employeeId}")
    public MessageResponse deleteEmployee(@PathVariable("employeeId") Long employeeId) throws Exception {
        EmployeeDto tempEmployee = employeeService.findById(employeeId);

        if(tempEmployee == null) {
            throw new RuntimeException("Employee is not found" + employeeId);
        }

        employeeService.deleteById(employeeId);

        return new MessageResponse("Delete employee id" + employeeId);
    }

    @PostMapping("/request-time-off")
    public RequestTimeOffDto addRequest(@RequestBody RegisterRequestTimeOffDto registerRequestTimeOffDto){
        RequestTimeOffDto dbRequest = employeeService.createRequest(registerRequestTimeOffDto);

        return dbRequest;
    }

    @GetMapping("/request-time-off")
    public List<RequestTimeOffDto> getAllRequest(){
        return employeeService.findAllRequest();
    }


    @GetMapping("/request-time-off/{employeeId}")
    public RequestTimeOffDto getRequestForEmployeeById(@PathVariable("employeeId") Long employeeId) throws Exception {
        RequestTimeOffDto requestTimeOffDto = employeeService.findRequestForEmployeeById(employeeId);

        return requestTimeOffDto;
    }

    @PutMapping("/request-time-off/{employeeId}")
    public RequestTimeOffDto updateRequestForEmployeeById(@RequestBody RequestTimeOffDto requestTimeOffDto){
        RequestTimeOffDto dbRequestTimeOffDto = employeeService.updateRequestForEmployeeById(requestTimeOffDto);

        return dbRequestTimeOffDto;
    }

    @DeleteMapping("/request-time-off/{employeeId}")
    public MessageResponse deleteRequestById(@PathVariable("employeeId") Long employeeId) throws Exception {
        RequestTimeOffDto tempRequest = employeeService.findRequestForEmployeeById(employeeId);

        if(tempRequest == null) {
            throw new RuntimeException("Employee is not found" + employeeId);

        }
        employeeService.deleteRequestById(employeeId);

        return new MessageResponse("Delete request for employee id" + employeeId);

    }

    @PutMapping("{employeeId}/image")
    public EmployeeDto saveImageForEmployee(@PathVariable("employeeId") Long employeeId, @RequestBody SaveImageRequest request){
        EmployeeDto dbImage = employeeService.saveImageForEmployee(employeeId, request);

        return dbImage;
    }

    @DeleteMapping("{employeeId}/image")
    public MessageResponse deleteImageForEmployee(@PathVariable("employeeId") Long employeeId) throws Exception{
        EmployeeDto tempImage = employeeService.findById(employeeId);



        if(tempImage == null) {
            throw new RuntimeException("Employee id not found" + employeeId);
        }

        employeeService.deleteImageForEmployee(employeeId);

        return new MessageResponse("Delete image for employee" + employeeId);

    }

    @PutMapping("/request-time-off/{requestId}/approve")
    public RequestTimeOffDto setStatusApproveById(@PathVariable("requestId") Long requestId){
        RequestTimeOffDto dbRequestTimeOffDto = employeeService.setStatusApproveById(requestId);

        return dbRequestTimeOffDto;
    }

    @PutMapping("/request-time-off/{requestId}/reject")
    public RequestTimeOffDto setStatusRejectById(@PathVariable("requestId") Long requestId){
        RequestTimeOffDto dbRequestTimeOffDto = employeeService.setStatusRejectById(requestId);

        return dbRequestTimeOffDto;
    }

    @PutMapping("/request-time-off/{requestId}/draft")
    public RequestTimeOffDto setStatusDraftById(@PathVariable("requestId") Long requestId){
        RequestTimeOffDto dbRequestTimeOffDto = employeeService.setStatusRejectById(requestId);

        return dbRequestTimeOffDto;
    }
}
