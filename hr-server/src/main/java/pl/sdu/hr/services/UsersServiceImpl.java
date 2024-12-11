package pl.sdu.hr.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.sdu.hr.models.User;
import pl.sdu.hr.payload.dto.UsersDto;
import pl.sdu.hr.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService{

    @Autowired
    UsersRepository usersRepository;

    @Override
    public List<UsersDto> findAllUsers(){
        List<User> usersList = usersRepository.findAll();

        List<UsersDto> usersListDto = new ArrayList<>();

        usersList.forEach((User item) -> {
            usersListDto.add(UsersDto.builder()
                            .id(item.getId())
                            .email(item.getEmail())
                            .username(item.getUsername())
                            .roles(item.getRoles().toString())
                    .build());
        });

        return usersListDto;

    }

}
