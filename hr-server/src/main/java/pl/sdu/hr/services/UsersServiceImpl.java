package pl.sdu.hr.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
                            .roles(item.getRoles())
                    .build());
        });

        return usersListDto;
    }

    @Override
    public UsersDto findUserById(Long userId) throws Exception {

        User user = usersRepository.findById(userId).orElseThrow();

        UsersDto usersDto = UsersDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();

        return usersDto;
    }

    @Transactional
    @Override
    public UsersDto createUser(UsersDto userDto) {
        User user = User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .roles(userDto.getRoles())
                .build();

        usersRepository.save(user);

        UsersDto usersDto = UsersDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();

        return usersDto;
    }

    @Transactional
    @Override
    public UsersDto updateUser(UsersDto userDto){
        User user = User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .roles(userDto.getRoles())
                .build();

        usersRepository.save(user);

        UsersDto usersDto = UsersDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();

        return usersDto;
    }

    @Transactional
    @Override
    public void deleteUserById(Long userId){
        usersRepository.deleteById(userId);
    }

}
