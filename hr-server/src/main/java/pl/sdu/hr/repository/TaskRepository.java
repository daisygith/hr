package pl.sdu.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.sdu.hr.models.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {
}
