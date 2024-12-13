package pl.sdu.hr.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.UsersMapper;
import pl.sdu.hr.models.User;
import pl.sdu.hr.payload.dto.UsersDto;
import pl.sdu.hr.repository.RoleRepository;
import pl.sdu.hr.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersServiceImpl implements UsersService{

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<UsersDto> findAllUsers(){
        List<User> usersList = usersRepository.findAll();

        List<UsersDto> usersListDto = new ArrayList<>();

        usersList.forEach((User item) -> {
            usersListDto.add(UsersMapper.mapUserToUserDto(item));
        });

        return usersListDto;
    }

    @Override
    public UsersDto findUserById(Long userId) throws Exception {

        User user = usersRepository.findById(userId).orElseThrow();

        UsersDto usersDto = UsersMapper.mapUserToUserDto(user);

        return usersDto;
    }

    @Transactional
    @Override
    public UsersDto createUser(UsersDto userDto) {
        User user = UsersMapper.mapUserDtoToUser(userDto);

        usersRepository.save(user);

        UsersDto usersDto = UsersMapper.mapUserToUserDto(user);

        return usersDto;
    }

    @Transactional
    @Override
    public UsersDto updateUser(UsersDto userDto){
        User user = usersRepository.findById(userDto.getId()).orElseThrow();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setRoles(userDto.getRoles().stream().map(UsersMapper::mapRoleDtoToRole).collect(Collectors.toSet()));

        usersRepository.save(user);

        UsersDto usersDto = UsersMapper.mapUserToUserDto(user);

        return usersDto;
    }

    @Transactional
    @Override
    public void deleteUserById(Long userId){
        usersRepository.deleteById(userId);
    }

}
