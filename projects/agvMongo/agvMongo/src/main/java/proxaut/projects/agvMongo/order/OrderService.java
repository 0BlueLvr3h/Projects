package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public void addNewOrder(Order order){
        orderRepository.save(order);
    }

    public String changeExistingOrder(Order newOrder, String oldOrderId) {
        Optional<Order> order = orderRepository.findById(oldOrderId);
        if(!order.isPresent()){
            throw new IllegalStateException("order not found");
        }
        order.ifPresent(o->{
            o.setNodes(newOrder.getNodes());
            o.setEdges(newOrder.getEdges());
            o.setOrderUpdateId(newOrder.getOrderUpdateId());
            orderRepository.save(o);
        });
        return "Done";
    }

    public void deleteOrderById(String id) {
        boolean exists = orderRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("order with id: " + id + "does not exists");
        }
        orderRepository.deleteById(id);
    }
}
