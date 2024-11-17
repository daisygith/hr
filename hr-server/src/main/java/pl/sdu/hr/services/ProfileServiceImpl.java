package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.ProfileMapper;
import pl.sdu.hr.models.Profile;
import pl.sdu.hr.payload.dto.ProfileDto;
import pl.sdu.hr.repository.ProfileRepository;

import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public ProfileDto findByUserId(Long userId) throws Exception {
        Optional<Profile> profile = profileRepository.findByUserId(userId);
        if (profile.isEmpty()) {
            return null;
        }
        ProfileDto profileDto = ProfileMapper.mapProfileToProfileDto(profile.get());

        return profileDto;
    }

    @Transactional
    @Override
    public ProfileDto update(ProfileDto profileDto) {
        Profile profile = ProfileMapper.mapProfileDtoToProfile(profileDto);

        profileRepository.save(profile);

        ProfileDto profileListDto = ProfileMapper.mapProfileToProfileDto(profile);

        return profileListDto;

    }
}