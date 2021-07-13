package kr.withus1030.server.rest;

import kr.withus1030.server.entity.Organization;
import kr.withus1030.server.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class OrganizationRestController {

    private OrganizationService organizationService;

    @Autowired
    public OrganizationRestController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping("/organizations")
    public Organization getTree(){
        return organizationService.getTree();
    }
}
