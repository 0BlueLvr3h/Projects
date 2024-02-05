package proxaut.projects.agvMongo.student;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String email;
    private List<String> favoriteSubjects;


    public Student(String firstName,
                   String lastName,
                   String email,
                   List<String> favoriteSubjects
    ) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.favoriteSubjects = favoriteSubjects;
    }
}
