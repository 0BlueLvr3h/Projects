package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
@AllArgsConstructor
public class ActionParameter {
    private String key;
    private String value;
}
