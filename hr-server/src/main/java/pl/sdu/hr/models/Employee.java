package pl.sdu.hr.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @NotNull
    private Long staffId;

    @NotNull
    @Size(max = 9)
    private String phone;

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

    private String image;

    private Long departmentId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "project_employees",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    private List<Project> projectEmployees = new ArrayList<>();

//    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Task> task = new ArrayList<>();

}
