package pl.sdu.hr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.sdu.hr.models.ERole;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private Integer id;
    private ERole name;
}
