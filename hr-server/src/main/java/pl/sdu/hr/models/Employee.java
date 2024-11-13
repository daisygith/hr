package pl.sdu.hr.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 20)
    private Long staffId;

    @NotBlank
    @Size(max = 9)
    private Number phone;

    @NotBlank
    @Size(max = 20)
    private String position;

    @NotBlank
    @Size(max = 20)
    private String department;

    @NotBlank
    @Size(max = 40)
    private String typeOfContract;

    @NotBlank
    @Size(max = 250)
    private String address;

}
