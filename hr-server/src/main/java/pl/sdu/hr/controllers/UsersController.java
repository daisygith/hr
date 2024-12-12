package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.UsersDto;
import pl.sdu.hr.payload.response.MessageResponse;
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

    @GetMapping("/{userId}")
    public UsersDto findUserById(@PathVariable("userId") Long userId) throws Exception {
        UsersDto usersDto = usersService.findUserById(userId);

        return usersDto;
    }

    @PostMapping("")
    public UsersDto createUser(@RequestBody UsersDto userDto){
        UsersDto dbUser = usersService.createUser(userDto);

        return dbUser;
    }

    @PutMapping("/{userId}")
    public UsersDto updateUser(@RequestBody UsersDto userDto){
        UsersDto dbUser = usersService.updateUser(userDto);

        return dbUser;
    }

    @DeleteMapping("/{userId}")
    public MessageResponse deleteUserById(@PathVariable("userId") Long userId) throws Exception {
        UsersDto tempUser = usersService.findUserById(userId);

        if(tempUser == null) {
            throw new RuntimeException("User is not found" + userId);
        }

        usersService.deleteUserById(userId);

        return new MessageResponse("Delete user id" + userId);
    }
}
