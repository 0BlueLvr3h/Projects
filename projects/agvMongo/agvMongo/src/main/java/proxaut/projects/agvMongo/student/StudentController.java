package proxaut.projects.agvMongo.student;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.List;

@RestController
@RequestMapping("api/v1/student")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;
    @GetMapping
    @CrossOrigin
    public List<Student> fetchAllStudents(){
        return studentService.getAllStudents();
    }

    @PostMapping
    @CrossOrigin()
    public void registerNewStudent(@RequestBody Student student){
        studentService.addNewStudent(student);
    }

}
