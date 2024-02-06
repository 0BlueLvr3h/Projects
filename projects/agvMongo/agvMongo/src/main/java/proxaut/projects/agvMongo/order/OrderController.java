package proxaut.projects.agvMongo.order;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("api/v1/order")
@AllArgsConstructor
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
        return "Done";
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


}
