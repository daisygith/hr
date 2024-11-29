package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.ProfileMapper;
import pl.sdu.hr.models.Profile;
import pl.sdu.hr.payload.dto.ProfileDto;
import pl.sdu.hr.payload.request.SaveImageRequest;
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
            Profile newProfile = new Profile();
            newProfile.setUserId(userId);
            profileRepository.save(newProfile);
            return ProfileMapper.mapProfileToProfileDto(newProfile);
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

    @Transactional
    @Override
    public ProfileDto saveImageForUser(Long userId, SaveImageRequest request) {
        Profile profile = profileRepository.findByUserId(userId).orElseThrow();
        profile.setImage(request.getUrl());
        profileRepository.save(profile);

        return ProfileMapper.mapProfileToProfileDto(profile);
    }

    @Transactional
    @Override
    public void deleteImageForUser(Long userId){
        Profile profile = profileRepository.findByUserId(userId).orElseThrow();
        profile.setImage(null);
        profileRepository.save(profile);
    }
}
