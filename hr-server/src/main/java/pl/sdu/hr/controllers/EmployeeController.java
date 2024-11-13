package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.EmployeeDto;
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
    public EmployeeDto getEmployee(@PathVariable Long employeeId) throws Exception {
        EmployeeDto employeeDto = employeeService.findById(employeeId);

        return employeeDto;
    }

    @PostMapping("")
    public EmployeeDto addEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto dbEmployee = employeeService.create(employeeDto);

        return dbEmployee;
    }

    @PutMapping("")
    public EmployeeDto updateEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto dbEmployee = employeeService.update(employeeDto);

        return dbEmployee;
    }

    @DeleteMapping("/{employeeId}")
    public String deleteEmployee(@PathVariable Long employeeId) throws Exception {
        EmployeeDto tempEmployee = employeeService.findById(employeeId);

        if(tempEmployee == null) {
            throw new RuntimeException("Employee is not found" + employeeId);
        }

        employeeService.deleteById(employeeId);

        return "Delete employee id" + employeeId;
    }
}
