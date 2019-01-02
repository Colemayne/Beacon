package TwilioAPI;

import com.twilio.Twilio; 
import com.twilio.converter.Promoter; 
import com.twilio.rest.api.v2010.account.Message; 
import com.twilio.type.PhoneNumber; 
 
import java.net.URI; 
import java.math.BigDecimal; 
 
public class MessageController { 
  
    public static final String ACCOUNT_SID = ApplicationConstants.ACCOUNT_SID;
    public static final String AUTH_TOKEN = ApplicationConstants.AUTH_TOKEN; 
            
    public static void main(String[] args) {
       System.out.println("MessageController and been created.");
    }

    public void sendMessage(String toNumber, String content) {
  
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(new PhoneNumber(toNumber),new PhoneNumber(ApplicationConstants.FROM_NUMBER), content).create();
        System.out.println(message.getSid());

    } 
}
