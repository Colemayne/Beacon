package beaconAPI;

public class Alert {

private String alert_id;
private String alert_type;
private String alert_recipients;
private String alert_content;
private String alert_recurring;

public String getAlertId() {
    return alert_id;
}
public void setAlertId(String alert_id){
    this.alert_id = alert_id;
}

public String getAlertType(){
    return alert_type;
}
public void setAlertType(String alert_type){
    this.alert_type = alert_type;
}

public String getAlertRecipients(){
    return alert_recipients;
}
public void setAlertRecipients(String alert_recipients){
    this.alert_recipients = alert_recipients;
}

public String getAlertContent() {
    return alert_content;
}
public void setAlertContent(String alert_content){
    this.alert_content = alert_content;
}

public String getAlertRecurring() {
    return alert_recurring;
}
public void setAlertRecurring(String alert_recurring){
    this.alert_recurring = alert_recurring;
}

@Override
public String toString(){
    return "alert_id: "+alert_id+" alert_type: "+alert_type+" alert_recipients: "+alert_recipients+" alert_content: "+alert_content+" alert_recurring: "+alert_recurring;
}


}
