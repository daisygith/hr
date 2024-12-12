package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.UsersDto;

import java.util.List;

public interface UsersService {

    List<UsersDto>findAllUsers();

    UsersDto findUserById(Long userId) throws Exception;

    UsersDto createUser(UsersDto userDto);

    UsersDto updateUser(UsersDto userDto);

    void deleteUserById(Long userId);

}
