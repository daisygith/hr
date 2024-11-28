package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {

    private Long id;

    private String name;

    private Long staffId;

    private String email;

    private String gender;

    private String destination;

    private String phone;

    private String address;

    private String image;

    private Long userId;


}
