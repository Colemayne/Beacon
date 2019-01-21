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

/* CrossOrigin will accept requests from anywhere. 
 * If CrossOrigin annotation is not included, This API will not be able to communicate with other web servers.
 *     
 * RestController is responsible for routing.
 * EX: http://127.0.0.1:8081/selectAll will return the arraylist in json format.
 */ 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class HookController {
	
	// GSON is the library we will use to convert POJO (Plain Old Java Objects) to JSON (JavaScript Object Notation).
    Gson gson = new Gson();
    DatabaseController DBC = new DatabaseController();

    /* RequestMapping annotations define routes and accepted protocols.
     * 
     * This function is responsible for sending the received string to the DatabaseController.
     * Input: String.
     * Output: None.
     * Expected Behavior: Create a User object from the provided string. Call the DatabaseController's addUser function. 
     */
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public void addUser(@RequestBody String jsonString) throws Exception {

        User user = gson.fromJson(jsonString, User.class);
        DBC.addUser(user.getEmployeeId(),user.getFirstName(),user.getLastName(),user.getPhoneNumber(),user.getDepartment(),user.getManagerId());
    }
    
    
    /* This function is responsible for sending the received string to the DatabaseController.
     * Input: String.
     * Output: None.
     * Expected Behavior: Create a User object from the provided string. Call the DatabaseController's delUser function. 
     */
    @RequestMapping(value = "/delUser", method = RequestMethod.POST)
    public void delUser(@RequestBody String jsonString) throws Exception {

        User user = gson.fromJson(jsonString, User.class);
        System.out.println(user.getEmployeeId());
        DBC.delUser(user.getEmployeeId());
    }
    
    /* This function is responsible for returning the ArrayList from the DatabaseController in json format.
     * Input: None.
     * Output: String.
     * Expected Behavior: The DatabaseController is called and the ArrayList of Users is returned in json format.
     */
    @RequestMapping("/selectAll")
    public String returnAll(){
     
        ArrayList<User> users = DBC.selectAllUsers();
        String json = gson.toJson(users);

        return json;

    }

    @RequestMapping("/selectNumUsers")
    public String selectNumUsers(){
    	
        String numOfUsers = DBC.selectNum(0);
        
        return "{\"number_of_users\":"+numOfUsers+"}";

    }

    @RequestMapping("/selectNumAlerts")
    public String selectNumAlerts(){

        String numOfAlerts = DBC.selectNum(1);
        
        return "{\"number_of_alerts\":"+numOfAlerts+"}";

    }

    @RequestMapping("/selectAllAlerts")
    public String returnAllAlerts(){

    	ArrayList<Alert> alerts = DBC.selectAllAlerts();
    	String json = gson.toJson(alerts);
    	
        return json;

    }

    @RequestMapping(value = "/selectSpecificAlert", method = RequestMethod.POST)
    public String returnSpecificAlert(@RequestBody String jsonString) throws Exception{

    	Alert alert = DBC.selectSpecificAlert(jsonString);
    	String json = gson.toJson(alert);
        return json;

    }

    @RequestMapping(value = "/addAlert", method = RequestMethod.POST)
    public String addAlert(@RequestBody String jsonString) throws Exception{

        return "Add Alert";

    }

    @RequestMapping(value = "/cancelAlert", method = RequestMethod.POST)
    public String cancelAlert(@RequestBody String jsonString) throws Exception{

        return "Cancel Alert";

    }

    

}





