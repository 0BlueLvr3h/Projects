package proxaut.projects.agvMongo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class StudentConfig{
    @Bean
    CommandLineRunner runner(StudentRepository repository, MongoTemplate template) {
        return  args -> {

        };

    }

}

