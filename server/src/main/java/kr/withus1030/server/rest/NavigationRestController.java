package kr.withus1030.server.rest;

import kr.withus1030.server.entity.Gnb;
import kr.withus1030.server.service.NavigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class NavigationRestController {

    private NavigationService navigationService;

    @Autowired
    public NavigationRestController(NavigationService navigationService) {
        this.navigationService = navigationService;
    }

    @GetMapping("/navigations")
    public List<Gnb> navigations(){
        return navigationService.findAll();
    }
}
