package beaconAPI;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;

import beaconAPI.ApplicationConstants;

    public class DatabaseController {
    	// Values set from ApplicationConstants interface.
        final String JDBC_DRIVER = ApplicationConstants.JDBC_DRIVER;
        final String DB_URL = ApplicationConstants.DB_URL;
        final String USER = ApplicationConstants.USER;
        final String PASS = ApplicationConstants.PASS;
    
    /* This function is responsible for sending an insert statement to mysql.    
     * Input: String, String, String, String.
     * Output: None.
     * Expected Behavior: Use provided arguments to create a string and use that to create a statement which is sent to mysql.
     * Error Handling: SQLException, Exception
     */
    public void addUser(String empId, String firstName, String lastName, String phoneNumber) {
    	
        Connection conn = null;
        Statement stmt = null;
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            
            conn = DriverManager.getConnection(DB_URL, USER, PASS);            
            stmt = conn.createStatement();
            
            String sql;
            sql = "INSERT INTO USERS ("
                    + ApplicationConstants.EMPLOYEE_ID_ROW + ","
                    + ApplicationConstants.FIRST_NAME_ROW + ","
                    + ApplicationConstants.LAST_NAME_ROW + ","
                    + ApplicationConstants.PHONE_NUMBER_ROW + ") "
            		+ "VALUES(\'"+empId+"\',\'"+firstName+"\',\'"+lastName+"\',\'"+phoneNumber+"\');";
            
            System.out.println(sql);
            
            stmt.executeUpdate(sql);
            
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
    } // End of addUser function.
    
    /* This function is responsible for sending a delete statement to mysql.    
     * Input: String.
     * Output: None.
     * Expected Behavior: Use provided arguments to create a string and use that to create a statement which is sent to mysql.
     * Error Handling: SQLException, Exception
     */
    public void delUser(String empId) {
    	
        Connection conn = null;
        Statement stmt = null;
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql;
            sql = "DELETE FROM USERS WHERE "+ApplicationConstants.EMPLOYEE_ID_ROW+"=\'"+empId+"\';";
            
            System.out.println(sql);
            
            stmt.executeUpdate(sql);
            
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
    } // End of delUser function.
    
    /* This function is responsible for returning all users currently in the database.    
     * Input: None.
     * Output: ArrayList<User>.
     * Expected Behavior: Return an ArrayList of all users currently in the database.
     * Error Handling: SQLException, Exception
     */
    public ArrayList<User> selectAllUsers() {
    	
        Connection conn = null;
        Statement stmt = null;
        ArrayList<User> users = new ArrayList<User>();
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql;
            sql = "SELECT "+ApplicationConstants.EMPLOYEE_ID_ROW+","+ApplicationConstants.FIRST_NAME_ROW+
            		","+ApplicationConstants.LAST_NAME_ROW+","+ApplicationConstants.PHONE_NUMBER_ROW+" FROM USERS;";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                User user = new User();
                user.setEmpID(rs.getString(ApplicationConstants.EMPLOYEE_ID_ROW));
                user.setFirstName(rs.getString(ApplicationConstants.FIRST_NAME_ROW));
                user.setLastName(rs.getString(ApplicationConstants.LAST_NAME_ROW));
                user.setPhoneNumber(rs.getString(ApplicationConstants.PHONE_NUMBER_ROW));
                users.add(user);
            }
            rs.close();
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
        return users;
    } // End of selectAllUsers function.


}
