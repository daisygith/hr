package pl.sdu.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.sdu.hr.models.RequestTimeOff;

@Repository
public interface RequestTimeOffRepository extends JpaRepository<RequestTimeOff, Long> {
}
