package beaconAPI;

public class Department {
	
	private String department_id;
	private String department_name;
	
	public String getDepartmentId() {
		return department_id;
	}
	public void setDepartmentId(String department_id) {
		this.department_id = department_id;
	}
	
	public String getDepartmentName() {
		return department_name;
	}
	public void setDepartmentName(String department_name) {
		this.department_name = department_name;
	}
	
	@Override
	public String toString() {
		return "department_id: "+department_id+", department_name"+department_name;
	}

}
