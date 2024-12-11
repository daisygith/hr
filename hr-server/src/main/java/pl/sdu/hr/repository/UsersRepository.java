package pl.sdu.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.sdu.hr.models.User;

@Repository
public interface UsersRepository  extends JpaRepository<User, Long> {
}
