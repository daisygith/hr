package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.ProfileDto;

public interface ProfileService {

    ProfileDto findByUserId(Long userId) throws Exception;

    ProfileDto update(ProfileDto profileDto);

}
