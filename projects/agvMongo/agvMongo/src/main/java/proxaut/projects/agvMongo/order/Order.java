package proxaut.projects.agvMongo.order;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Order {
    @Id
    private String orderId;

    private int orderUpdateId;
    private List<Node> nodes;
    private List<Edge> edges;

    public Order(int orderUpdateId, List<Node> nodes, List<Edge> edges) {
        this.orderUpdateId = orderUpdateId;
        this.nodes = nodes;
        this.edges = edges;
    }
}
