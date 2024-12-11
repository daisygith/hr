package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.sdu.hr.payload.dto.UsersDto;
import pl.sdu.hr.services.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    UsersService usersService;

    @GetMapping("")
    public List<UsersDto> findAllUsers() {
        return usersService.findAllUsers();
    }
}
