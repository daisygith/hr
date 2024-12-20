package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.sdu.hr.payload.dto.DepartmentDto;
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
}
