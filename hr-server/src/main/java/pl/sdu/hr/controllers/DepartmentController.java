package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.DepartmentDto;
import pl.sdu.hr.payload.response.MessageResponse;
import pl.sdu.hr.services.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("api/departments")
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @GetMapping("")
    public List<DepartmentDto> findAllDepartments() {
        return departmentService.findAllDepartments();
    }

    @GetMapping("/{departmentId}")
    public DepartmentDto getDepartmentById(@PathVariable("departmentId") Long departmentId) throws Exception {
        DepartmentDto departmentDto = departmentService.findById(departmentId);

        return departmentDto;
    }

    @PostMapping("")
    public DepartmentDto addDepartment (@RequestBody DepartmentDto departmentDto) {
        DepartmentDto dbDepartment = departmentService.createDepartment(departmentDto);

        return dbDepartment;
    }

    @PutMapping("/{departmentId}")
    public DepartmentDto updateDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto dbDepartment = departmentService.updateDepartment(departmentDto);

        return dbDepartment;
    }

    @DeleteMapping("/{departmentId}")
    public MessageResponse deleteDepartmentById(@PathVariable("departmentId") Long departmentId) throws Exception {
        DepartmentDto tempDepartment = departmentService.findById(departmentId);

        if(tempDepartment == null) {
            throw new RuntimeException("Department is not fount " + departmentId);
        }

        departmentService.deleteDepartmentById(departmentId);

        return new MessageResponse("Delete department id" + departmentId);
    }


}
