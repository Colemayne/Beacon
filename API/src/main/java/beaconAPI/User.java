package beaconAPI;

public class User{
	
    private String empId;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public String getEmpID() {
        return empId;
    }
    
    public void setEmpID(String empId){
        this.empId = empId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    
    public String getPhoneNumber(){
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    @Override public String toString(){
        return "firstName: "+firstName+ " lastName: "+lastName+" empId: "+empId+" phoneNumber: "+phoneNumber; 
    }

}