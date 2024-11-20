package pl.sdu.hr.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String name;

    private Long staffId;

    @NotBlank
    @Size(max = 100)
    private String email;

    @NotBlank
    @Size(max = 30)
    private String gender;

    @NotBlank
    @Size(max = 50)
    private String destination;

    @NotNull
    @Size(max = 9)
    private String phone;

    @NotBlank
    @Size(max = 150)
    private String address;

    @Column(unique = true)
    private Long userId;

}
