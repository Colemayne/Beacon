package webapp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HookController {

    @GetMapping("/")
    public String index(){

        return "summary";
    }

    @GetMapping("/crud")
    public String crud(){
    
        return "crud";
    }

    @GetMapping("/alerts")
    public String alert(){

        return "alerts";
    }


}
