package pl.sdu.hr.mappers;

import pl.sdu.hr.models.User;
import pl.sdu.hr.payload.dto.UsersDto;

public class UsersMapper {
    public static UsersDto mapUserToUserDto(User user){
        UsersDto userDto = UsersDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();

        return userDto;
    }

    public static User mapUserDtoToUser(UsersDto userDto){
        User user = User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .roles(userDto.getRoles())
                .build();

        return user;
    }
}
