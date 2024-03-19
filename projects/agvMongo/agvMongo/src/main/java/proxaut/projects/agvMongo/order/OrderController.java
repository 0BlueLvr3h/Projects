package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/v1/order")
@RestController
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    @CrossOrigin
    public List<Order> fetchAllOrders(){
        return orderService.getAllOrders();
    }

    @PostMapping
    @CrossOrigin
    public String addNewOrder(@RequestBody Order order){
        orderService.addNewOrder(order);
        return "Order " + order + " added";
    }

    @PutMapping(path = "{oldOrderId}")
    @CrossOrigin
    public String changeOrder(@RequestBody Order newOrder, @PathVariable("oldOrderId") String oldOrderId){
        return orderService.changeExistingOrder(newOrder,oldOrderId);
    }

    @DeleteMapping(path = "{orderId}")
    @CrossOrigin
    public String deleteOrder(@PathVariable("orderId") String id){
        orderService.deleteOrderById(id);
        return "Done";
    }

    @DeleteMapping
    @CrossOrigin
    public String deleteAllOrders(){
        orderService.deleteAllOrder();
        return "Done";
    }


}
