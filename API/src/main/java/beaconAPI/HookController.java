package beaconAPI;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class HookController {
    Gson gson = new Gson();
    DatabaseController DBC = new DatabaseController();


    @RequestMapping(value = "/AddUser", method = RequestMethod.POST)
    public void processUser(@RequestBody String jsonString) throws Exception {

        /*User user = gson.fromJson(jsonString, User.class);
        System.out.println(user.getEmpID());
        System.out.println(user.getFirstName());
        System.out.println(user.getLastName());
        System.out.println(user.getPhoneNumber());
        DBC.addUser(user.getEmpID(),user.getFirstName(),user.getLastName(),user.getPhoneNumber()); */
    }
    @RequestMapping("/TestIt")
    public String returnAll2(){
        
        DBC.addUser("1001","Coleman","Beiler","7034398816"); 

        return "Done";

    }
    @RequestMapping("/selectAll")
    public String returnAll(){
        ArrayList users = DBC.selectAllUsers();
        String json = gson.toJson(users);

        return json;

    }


    

}
