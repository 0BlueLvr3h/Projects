package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document
@AllArgsConstructor
public class Position {
    private int x;
    private int y;
    private String mapId;

}
