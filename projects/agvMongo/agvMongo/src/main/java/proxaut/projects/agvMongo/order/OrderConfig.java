package proxaut.projects.agvMongo.order;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class OrderConfig {
    @Bean
    CommandLineRunner runner2(OrderRepository repository, MongoTemplate template) {
        return  args -> {

        };

    }
}
