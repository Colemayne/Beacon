package TwilioAPI;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class HookController {
	
    @RequestMapping("/sendMessage")
    public String testTextMessage(){

        MessageController messageController = new MessageController();
        messageController.sendMessage("+17034398816", "Content for Twilio Message");
        return "message has been sent";

    }

}
