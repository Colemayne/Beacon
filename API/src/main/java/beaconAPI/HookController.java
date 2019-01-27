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
    @RequestMapping(value = "/add/user", method = RequestMethod.POST)
    public void addUser(@RequestBody String jsonString) throws Exception {

        User user = gson.fromJson(jsonString, User.class);
        DBC.addUser(user.getEmployeeId(),user.getFirstName(),user.getLastName(),user.getPhoneNumber(),user.getDepartment(),user.getManagerId());
    }
    
    
    /* This function is responsible for sending the received string to the DatabaseController.
     * Input: String.
     * Output: None.
     * Expected Behavior: Create a User object from the provided string. Call the DatabaseController's delUser function. 
     */
    @RequestMapping(value = "/delete/user", method = RequestMethod.POST)
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
    @RequestMapping("/select/user/all")
    public String returnAll(){
     
        ArrayList<User> users = DBC.selectAllUsers();
        String json = gson.toJson(users);

        return json;

    }

    @RequestMapping("/select/user/number")
    public String selectNumUsers(){
    	
        String numOfUsers = DBC.selectNum(0);
        
        return "{\"number_of_users\":"+numOfUsers+"}";

    }

    @RequestMapping("/select/alert/number")
    public String selectNumAlerts(){

        String numOfAlerts = DBC.selectNum(1);
        
        return "{\"number_of_alerts\":"+numOfAlerts+"}";

    }

    @RequestMapping("/select/alert/all")
    public String returnAllAlerts(){

    	ArrayList<Alert> alerts = DBC.selectAllAlerts();
    	String json = gson.toJson(alerts);
    	
        return json;

    }

    @RequestMapping(value = "/select/alert/specific", method = RequestMethod.POST)
    public String returnSpecificAlert(@RequestBody String jsonString) throws Exception{

    	Alert alert = DBC.selectSpecificAlert(jsonString);
    	String json = gson.toJson(alert);
        return json;

    }

    @RequestMapping(value = "/add/alert", method = RequestMethod.POST)
    public void addAlert(@RequestBody String jsonString) throws Exception{

    	Alert alert = gson.fromJson(jsonString, Alert.class);
        DBC.addAlert(alert.getAlertId(),alert.getAlertType(),alert.getAlertRecipients(),alert.getAlertContent(),alert.getAlertRecurring());

    }

    @RequestMapping(value = "/delete/alert", method = RequestMethod.POST)
    public void cancelAlert(@RequestBody String jsonString) throws Exception{

    	Alert alert = gson.fromJson(jsonString, Alert.class);
    	DBC.delAlert(alert.getAlertId());
    }
    
    @RequestMapping("/select/departments/all")
    public String returnAllDepartments(){
     
        ArrayList<Department> department = DBC.selectAllDepartments();
        String json = gson.toJson(department);

        return json;
    }
    
    @RequestMapping(value = "/add/department", method = RequestMethod.POST)
    public void addDepartment(@RequestBody String jsonString) throws Exception{

    	Department department = gson.fromJson(jsonString, Department.class);
    	DBC.addDepartment(department.getDepartmentId(), department.getDepartmentName());
    }
    
    @RequestMapping(value = "/delete/department", method = RequestMethod.POST)
    public void deleteDepartment(@RequestBody String jsonString) throws Exception{

    	Department department = gson.fromJson(jsonString, Department.class);
    	DBC.delAlert(department.getDepartmentId());
    }
    

}





