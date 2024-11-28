package pl.sdu.hr.services;

import pl.sdu.hr.payload.dto.ProfileDto;
import pl.sdu.hr.payload.request.SaveImageRequest;

public interface ProfileService {

    ProfileDto findByUserId(Long userId) throws Exception;

    ProfileDto update(ProfileDto profileDto);

    ProfileDto saveImageForUser(Long userId, SaveImageRequest request);

}
