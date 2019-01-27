package beaconAPI;

public class ActiveAlert {
	
	private String alert_id;
	private String employee_id;
	private String employee_response;
	
	public String getAlertId() {
		return alert_id;
	}
	public void setAlertId(String alert_id) {
		this.alert_id = alert_id;
	}
	
	public String getEmployeeId() {
		return employee_id;
	}
	public void setEmployeeId(String employee_id) {
		this.employee_id = employee_id;
	}
	
	public String getEmployeeResponse() {
		return employee_response;
	}
	public void setEmployeeResponse(String employee_response) {
		this.employee_response = employee_response;
	}

}
