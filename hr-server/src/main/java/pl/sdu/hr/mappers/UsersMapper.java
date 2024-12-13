package pl.sdu.hr.mappers;

import pl.sdu.hr.models.Role;
import pl.sdu.hr.models.User;
import pl.sdu.hr.payload.dto.RoleDto;
import pl.sdu.hr.payload.dto.UsersDto;

import java.util.stream.Collectors;

public class UsersMapper {
    public static UsersDto mapUserToUserDto(User user){
        UsersDto userDto = UsersDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(UsersMapper::mapRoleToRoleDto).collect(Collectors.toSet()))
                .build();

        return userDto;
    }

    public static User mapUserDtoToUser(UsersDto userDto){
        User user = User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .roles(userDto.getRoles().stream().map(UsersMapper::mapRoleDtoToRole).collect(Collectors.toSet()))
                .build();

        return user;
    }

    public static RoleDto mapRoleToRoleDto(Role role) {
        RoleDto roleDto = RoleDto.builder()
                .id(role.getId())
                .name(role.getName())
                .build();

        return roleDto;
    }

    public static Role mapRoleDtoToRole(RoleDto roleDto){
        Role role = Role.builder()
                .id(roleDto.getId())
                .name(roleDto.getName())
                .build();

        return role;
    }
}
