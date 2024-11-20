package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.EmployeeDto;
import pl.sdu.hr.payload.dto.RegisterRequestTimeOffDto;
import pl.sdu.hr.payload.dto.RequestTimeOffDto;
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
    public String deleteEmployee(@PathVariable("employeeId") Long employeeId) throws Exception {
        EmployeeDto tempEmployee = employeeService.findById(employeeId);

        if(tempEmployee == null) {
            throw new RuntimeException("Employee is not found" + employeeId);
        }

        employeeService.deleteById(employeeId);

        return "Delete employee id" + employeeId;
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
    public RequestTimeOffDto updateRequestForEmployeeById(@RequestBody RegisterRequestTimeOffDto registerRequestTimeOffDto){
        RequestTimeOffDto dbRequestTimeOffDto = employeeService.updateRequestForEmployeeById(registerRequestTimeOffDto);

        return dbRequestTimeOffDto;
    }
}
