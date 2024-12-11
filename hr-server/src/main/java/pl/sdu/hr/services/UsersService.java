package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.UsersDto;

import java.util.List;

public interface UsersService {

    List<UsersDto>findAllUsers();

}
