package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document
@AllArgsConstructor
public class Edge {
    private String edgeId;
    private int sequenceId;
    private String startNodeId;
    private String endNodeId;
    private boolean released;
    private List<Action> actions;
}
