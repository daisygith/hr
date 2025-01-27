package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsersDto {
    private long id;

    private String email;

    private String username;

    private Long employeeId;

    private Set<RoleDto> roles = new HashSet<>();
}
