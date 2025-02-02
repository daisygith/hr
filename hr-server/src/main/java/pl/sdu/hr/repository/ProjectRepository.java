package pl.sdu.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.sdu.hr.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
