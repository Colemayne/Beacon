package beaconAPI;
import java.sql.*;
import java.util.ArrayList;

public class DatabaseController {
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/Beacon";
    static final String USER = "beaconUser";
    static final String PASS = "BeaconApp";
    public static void main(String args[]) {

    }

    public static void addUser(String empId, String firstName, String lastName, String phoneNumber) {
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Creating Statement");
            stmt = conn.createStatement();
            String sql;
            sql = "INSERT INTO USERS VALUES(\'"+empId+"\',\'"+firstName+"\',\'"+lastName+"\',\'"+phoneNumber+"\');";
            System.out.println(sql);
            stmt.executeUpdate(sql);
            System.out.println("Successfully Added");
            stmt.close();
            conn.close();

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException se2) {

              }   
           try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
    }

}