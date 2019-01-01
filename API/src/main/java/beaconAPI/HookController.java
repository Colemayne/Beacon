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
        DBC.addUser(user.getEmpID(),user.getFirstName(),user.getLastName(),user.getPhoneNumber());
    }
    
    /* This function is responsible for sending the received string to the DatabaseController.
     * Input: String.
     * Output: None.
     * Expected Behavior: Create a User object from the provided string. Call the DatabaseController's delUser function. 
     */
    @RequestMapping(value = "/delUser", method = RequestMethod.POST)
    public void delUser(@RequestBody String jsonString) throws Exception {

        User user = gson.fromJson(jsonString, User.class);
        System.out.println(user.getEmpID());
        DBC.delUser(user.getEmpID());
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


    

}
