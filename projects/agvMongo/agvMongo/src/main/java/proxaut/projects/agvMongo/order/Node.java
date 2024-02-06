package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document
@AllArgsConstructor
public class Node {
    private String nodeId;
    private int sequenceId;
    private boolean released;
    private Position nodePosition;
    private List<Action> actions;

}
