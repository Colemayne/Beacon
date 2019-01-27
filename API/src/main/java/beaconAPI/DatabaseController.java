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
    public void addUser(String empId, String firstName, String lastName, String phoneNumber, String department, String managerId) {
    	
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
                    + ApplicationConstants.PHONE_NUMBER_ROW + ","
                    + ApplicationConstants.DEPARTMENT_ROW + ","
                    + ApplicationConstants.MANAGER_ID_ROW + ") "
            		+ "VALUES(\'"+empId+"\',\'"+firstName+"\',\'"+lastName+"\',\'"+phoneNumber+"\',\'"+department+"\',\'"+managerId+"\');";
            
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
            		","+ApplicationConstants.LAST_NAME_ROW+","+ApplicationConstants.PHONE_NUMBER_ROW+
            		","+ApplicationConstants.DEPARTMENT_ROW+","+ApplicationConstants.MANAGER_ID_ROW+" FROM USERS;";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                User user = new User();
                user.setEmployeeId(rs.getString(ApplicationConstants.EMPLOYEE_ID_ROW));
                user.setFirstName(rs.getString(ApplicationConstants.FIRST_NAME_ROW));
                user.setLastName(rs.getString(ApplicationConstants.LAST_NAME_ROW));
                user.setPhoneNumber(rs.getString(ApplicationConstants.PHONE_NUMBER_ROW));
                user.setDepartment(rs.getString(ApplicationConstants.DEPARTMENT_ROW));
                user.setManagerId(rs.getString(ApplicationConstants.MANAGER_ID_ROW));
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
    
    public String selectNum(int controlNum) {
    	
        Connection conn = null;
        Statement stmt = null;
        String numberOfUsers = new String();
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql = new String();
            
            if (controlNum == 0) {
                sql = "SELECT COUNT(*) FROM "+ApplicationConstants.USERS_TABLE+";";
            } else if (controlNum == 1) {
            	sql = "SELECT COUNT(*) FROM "+ApplicationConstants.ALERTS_TABLE+";";
            }
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	numberOfUsers = rs.getString("count(*)");
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
        return numberOfUsers;
    } // End of selectNum function.
    
    public ArrayList<Alert> selectAllAlerts() {
    	
        Connection conn = null;
        Statement stmt = null;
        ArrayList<Alert> alerts = new ArrayList<Alert>();
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql;
            sql = "SELECT "+ApplicationConstants.ALERT_ID_ROW+","+ApplicationConstants.ALERT_TYPE_ROW+
            		","+ApplicationConstants.ALERT_RECIPIENTS_ROW+","+ApplicationConstants.ALERT_CONTENT_ROW+
            		","+ApplicationConstants.ALERT_RECURRING_ROW+" FROM "+ApplicationConstants.ALERTS_TABLE+";";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                Alert alert = new Alert();
                alert.setAlertId(rs.getString(ApplicationConstants.ALERT_ID_ROW));
                alert.setAlertType(rs.getString(ApplicationConstants.ALERT_TYPE_ROW));
                alert.setAlertRecipients(rs.getString(ApplicationConstants.ALERT_RECIPIENTS_ROW));
                alert.setAlertContent(rs.getString(ApplicationConstants.ALERT_CONTENT_ROW));
                alert.setAlertRecurring(rs.getString(ApplicationConstants.ALERT_RECURRING_ROW));
                alerts.add(alert);
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
        return alerts;
    } // End of selectAllAlerts function.
    
    public Alert selectSpecificAlert(String alertId) {
    	
        Connection conn = null;
        Statement stmt = null;
        Alert alert = new Alert();
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql;
            sql = "SELECT "+ApplicationConstants.ALERT_ID_ROW+","+ApplicationConstants.ALERT_TYPE_ROW+
            		","+ApplicationConstants.ALERT_RECIPIENTS_ROW+","+ApplicationConstants.ALERT_CONTENT_ROW+
            		","+ApplicationConstants.ALERT_RECURRING_ROW+" FROM "+ApplicationConstants.ALERTS_TABLE+" WHERE "+
            		ApplicationConstants.ALERT_ID_ROW+"=\'"+alertId+"\';";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                alert.setAlertId(rs.getString(ApplicationConstants.ALERT_ID_ROW));
                alert.setAlertType(rs.getString(ApplicationConstants.ALERT_TYPE_ROW));
                alert.setAlertRecipients(rs.getString(ApplicationConstants.ALERT_RECIPIENTS_ROW));
                alert.setAlertContent(rs.getString(ApplicationConstants.ALERT_CONTENT_ROW));
                alert.setAlertRecurring(rs.getString(ApplicationConstants.ALERT_RECURRING_ROW));
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
        return alert;
    } // End of selectSpecificAlert function.

    public void addAlert(String alertId, String alertType, String alertRecipients, String alertContent, String alertRecurring) {
    	
        Connection conn = null;
        Statement stmt = null;
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            
            conn = DriverManager.getConnection(DB_URL, USER, PASS);            
            stmt = conn.createStatement();
            
            String sql;
            sql = "INSERT INTO "+ApplicationConstants.ALERTS_TABLE+" ("
                    + ApplicationConstants.ALERT_ID_ROW + ","
                    + ApplicationConstants.ALERT_TYPE_ROW + ","
                    + ApplicationConstants.ALERT_RECIPIENTS_ROW + ","
                    + ApplicationConstants.ALERT_CONTENT_ROW + ","
                    + ApplicationConstants.ALERT_RECURRING_ROW + ") "
            		+ "VALUES(\'"+alertId+"\',\'"+alertType+"\',\'"+alertRecipients+"\',\'"+alertContent+"\',\'"+alertRecurring+"\');";
            
            System.out.println(sql);
            
            
            
            stmt.executeUpdate(sql);
            
            stmt.close();
            conn.close();
            
            fillActiveAlerts(alertId, alertRecipients);

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
    } // End of addAlert function.

    public void delAlert(String alertId) {
	
       Connection conn = null;
       Statement stmt = null;
    
        try {
    	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
        
            String sql;
            sql = "DELETE FROM "+ApplicationConstants.ALERTS_TABLE+" WHERE "+ApplicationConstants.ALERT_ID_ROW+"=\'"+alertId+"\';";
        
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
    } // End of delAlert function.
    
    public ArrayList<Department> selectAllDepartments() {
    	
        Connection conn = null;
        Statement stmt = null;
        ArrayList<Department> departments = new ArrayList<Department>();
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            
            String sql;
            sql = "SELECT "+ApplicationConstants.DEPARTMENT_ID_ROW+","+ApplicationConstants.DEPARTMENT_NAME_ROW+
            		", FROM "+ApplicationConstants.DEPARTMENTS_TABLE+";";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                Department department = new Department();
                department.setDepartmentId(rs.getString(ApplicationConstants.DEPARTMENT_ID_ROW));
                department.setDepartmentName(rs.getString(ApplicationConstants.DEPARTMENT_NAME_ROW));
                departments.add(department);
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
        return departments;
    } // End of selectAllDepartments function.
    
    public void addDepartment(String departmentId, String departmentName) {
    	
        Connection conn = null;
        Statement stmt = null;
        
        try {
        	
            Class.forName("com.mysql.jdbc.Driver");
            
            conn = DriverManager.getConnection(DB_URL, USER, PASS);            
            stmt = conn.createStatement();
            
            String sql;
            sql = "INSERT INTO "+ApplicationConstants.DEPARTMENTS_TABLE+" ("
                    + ApplicationConstants.DEPARTMENT_ID_ROW + ","
                    + ApplicationConstants.DEPARTMENT_NAME_ROW + ") "
            		+ "VALUES(\'"+departmentId+"\',\'"+departmentName+"\');";
            
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
    } // End of addDepartment function.
    
    public void delDepartment(String departmentId) {
    	
        Connection conn = null;
        Statement stmt = null;
     
         try {
     	
             Class.forName("com.mysql.jdbc.Driver");
             conn = DriverManager.getConnection(DB_URL, USER, PASS);
             stmt = conn.createStatement();
         
             String sql;
             sql = "DELETE FROM "+ApplicationConstants.DEPARTMENTS_TABLE+" WHERE "+ApplicationConstants.DEPARTMENT_ID_ROW+"=\'"+departmentId+"\';";
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
    } // End of delDepartment function.
    
    public void fillActiveAlerts(String alertId, String department) {
        Connection conn = null;
        Statement stmt = null;
        ArrayList<ActiveAlert> activeAlerts = new ArrayList<ActiveAlert>();
        try {

            Class.forName("com.mysql.jdbc.Driver");
            
            conn = DriverManager.getConnection(DB_URL, USER, PASS);            
            stmt = conn.createStatement();
            
            String sql;
            sql = "SELECT "+ApplicationConstants.EMPLOYEE_ID_ROW+" FROM USERS WHERE department=\'"+department+"\';";
            
            ResultSet rs = stmt.executeQuery(sql);
    
            while (rs.next()) {
            	
                ActiveAlert activeAlert = new ActiveAlert();
                activeAlert.setAlertId(alertId);
                activeAlert.setEmployeeId(rs.getString(ApplicationConstants.EMPLOYEE_ID_ROW));
                activeAlert.setEmployeeResponse("0");
                activeAlerts.add(activeAlert);
            }
            rs.close();
            
            int count = 0;
            
            while(activeAlerts.size() > count) {
            	
                sql = "INSERT INTO "+ApplicationConstants.ACTIVE_ALERTS_TABLE+" ("+ApplicationConstants.ALERT_ID_ROW+
                		","+ApplicationConstants.EMPLOYEE_ID_ROW+","+ApplicationConstants.EMPLOYEE_RESPONSE_ROW+
                		") VALUES(\'"+alertId+"\',\'"+activeAlerts.get(count).getEmployeeId()+"\',\'0\');";
                stmt.executeUpdate(sql);
                count++;
            }
            
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
    } // End of fillActiveAlerts function
    
    

}
