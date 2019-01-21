package beaconAPI;

public interface ApplicationConstants {
	
	public static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	
	public static final String DB_URL = "jdbc:mysql://localhost/Beacon";
	
	public static final String USER = "beaconUser";
	
	public static final String PASS = "BeaconApp";

    // USERS

    public static final String USERS_TABLE = "USERS";

    public static final String DEPARTMENTS_TABLE = "DEPARTMENTS";
	
    public static final String EMPLOYEE_ID_ROW = "employee_id";
	
	public static final String FIRST_NAME_ROW = "first_name";
	
	public static final String LAST_NAME_ROW = "last_name";
	
    public static final String PHONE_NUMBER_ROW = "phone_number";
	
	public static final String DEPARTMENT_ROW = "department";
	
	public static final String MANAGER_ID_ROW = "manager_id";

    public static final String DEPARTMENT_ID_ROW = "department_id";

    public static final String DEPARTMENT_NAME_ROW = "department_name";

    // ALERTS

    public static final String ALERTS_TABLE = "ALERTS";

    public static final String ACTIVE_ALERTS_TABLE = "ACTIVE_ALERTS";

    public static final String ALERT_ID_ROW = "alert_id";

    public static final String ALERT_TYPE_ROW = "alert_type";

    public static final String ALERT_RECIPIENTS_ROW = "alert_recipients";

    public static final String ALERT_CONTENT_ROW = "alert_content";

    public static final String ALERT_RECURRING_ROW = "alert_recurring";


	
}
