package beaconAPI;

public class User{
	
    private String employee_id;
    private String first_name;
    private String last_name;
    private String phone_number;
    private String department;
    private String manager_id;

    public String getEmployeeId() {
        return employee_id;
    }
    
    public void setEmployeeId(String employee_id){
        this.employee_id = employee_id;
    }
    
    public String getFirstName() {
        return first_name;
    }
    
    public void setFirstName(String first_name){
        this.first_name = first_name;
    }
    
    public String getLastName() {
        return last_name;
    }
    
    public void setLastName(String last_name){
        this.last_name = last_name;
    }
    
    public String getPhoneNumber(){
        return phone_number;
    }
    
    public void setPhoneNumber(String phone_number){
        this.phone_number = phone_number;
    }

    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
    	this.department = department;
    }
    
    public String getManagerId() {
    	return manager_id;
    }
    public void setManagerId(String manager_id) {
    	this.manager_id = manager_id;
    }

    @Override public String toString(){
        return "firstName: "+first_name+ " last_name: "+last_name+" employee_id: "+employee_id+" phone_number: "+phone_number; 
    }

}
