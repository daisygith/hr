package pl.sdu.hr.mappers;


import pl.sdu.hr.models.Profile;
import pl.sdu.hr.payload.dto.ProfileDto;

public class ProfileMapper {
    public static ProfileDto mapProfileToProfileDto(Profile profile) {
        ProfileDto profileDto = ProfileDto.builder()
                .id(profile.getId())
                .name(profile.getName())
                .staffId(profile.getStaffId())
                .email(profile.getEmail())
                .gender(profile.getGender())
                .destination(profile.getDestination())
                .phone(profile.getPhone())
                .address(profile.getAddress())
                .image(profile.getImage())
                .userId(profile.getUserId())
                .build();

        return profileDto;
    }

    public static Profile mapProfileDtoToProfile(ProfileDto profileDto){
        Profile profile = Profile.builder()
                .id(profileDto.getId())
                .name(profileDto.getName())
                .email(profileDto.getEmail())
                .gender(profileDto.getGender())
                .destination(profileDto.getDestination())
                .phone(profileDto.getPhone())
                .address(profileDto.getAddress())
                .image(profileDto.getImage())
                .userId(profileDto.getUserId())
                .build();

        return profile;
    }
}
