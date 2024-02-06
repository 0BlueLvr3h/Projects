package proxaut.projects.agvMongo.order;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
public class Action {
    private String actionId;
    private String actionType;
    private String blockingType;
    private List<ActionParameter> actionParameters;


}
