package pl.sdu.hr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sdu.hr.mappers.ProfileMapper;
import pl.sdu.hr.models.Profile;
import pl.sdu.hr.models.User;
import pl.sdu.hr.payload.dto.ProfileDto;
import pl.sdu.hr.payload.request.SaveImageRequest;
import pl.sdu.hr.repository.ProfileRepository;
import pl.sdu.hr.repository.UserRepository;

import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public ProfileDto findByUserId(Long userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow();
        Optional<Profile> profile = profileRepository.findByUserId(userId);
        if (profile.isEmpty()) {
            Profile newProfile = new Profile();
            newProfile.setUserId(userId);
            profileRepository.save(newProfile);
            ProfileDto profileDto = ProfileMapper.mapProfileToProfileDto(newProfile);
            profileDto.setStaffId(user.getEmployee() != null ? user.getEmployee().getId() : null);
            return profileDto;
        }
        ProfileDto profileDto = ProfileMapper.mapProfileToProfileDto(profile.get());
        profileDto.setStaffId(user.getEmployee() != null ? user.getEmployee().getId() : null);

        return profileDto;
    }

    @Transactional
    @Override
    public ProfileDto update(ProfileDto profileDto) {
        Profile profile = ProfileMapper.mapProfileDtoToProfile(profileDto);

        profileRepository.save(profile);

        User user = userRepository.findById(profile.getUserId()).orElseThrow();

        ProfileDto profileListDto = ProfileMapper.mapProfileToProfileDto(profile);
        profileListDto.setStaffId(user.getEmployee() != null ? user.getEmployee().getId() : null);
        return profileListDto;

    }

    @Transactional
    @Override
    public ProfileDto saveImageForUser(Long userId, SaveImageRequest request) {
        User user = userRepository.findById(userId).orElseThrow();
        Profile profile = profileRepository.findByUserId(userId).orElseThrow();
        profile.setImage(request.getUrl());
        profileRepository.save(profile);

        ProfileDto profileDto = ProfileMapper.mapProfileToProfileDto(profile);
        profileDto.setStaffId(user.getEmployee() != null ? user.getEmployee().getId() : null);
        return profileDto;
    }

    @Transactional
    @Override
    public void deleteImageForUser(Long userId){
        Profile profile = profileRepository.findByUserId(userId).orElseThrow();
        profile.setImage(null);
        profileRepository.save(profile);
    }
}
