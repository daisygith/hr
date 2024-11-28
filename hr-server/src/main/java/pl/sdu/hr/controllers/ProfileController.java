package pl.sdu.hr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.sdu.hr.payload.dto.ProfileDto;
import pl.sdu.hr.payload.request.SaveImageRequest;
import pl.sdu.hr.security.services.UserDetailsImpl;
import pl.sdu.hr.services.ProfileService;

@RestController
@RequestMapping("api/profiles")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @GetMapping("/current")
    public ProfileDto getProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception{
        ProfileDto profileDto = profileService.findByUserId(userDetails.getId());

        return profileDto;
    }

    @PutMapping("/edit")
    public ProfileDto updateProfile(@RequestBody ProfileDto profileDto, @AuthenticationPrincipal UserDetailsImpl userDetails){
        profileDto.setUserId(userDetails.getId());
        ProfileDto dbProfile = profileService.update(profileDto);

        return dbProfile;
    }

    @PutMapping("/image")
    public ProfileDto saveImageForUser(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody SaveImageRequest request){
        ProfileDto dbImage = profileService.saveImageForUser(userDetails.getId(), request);

        return dbImage;
    }
}
