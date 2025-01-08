package pl.sdu.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.sdu.hr.models.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.project.id = ?1")
    List<Task> findAllByProjectId(Long projectId);
}
