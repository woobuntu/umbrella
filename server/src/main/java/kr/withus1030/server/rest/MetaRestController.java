package kr.withus1030.server.rest;

import kr.withus1030.server.entity.Meta;
import kr.withus1030.server.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class MetaRestController {

    private MetaService metaService;

    @Autowired
    public MetaRestController(MetaService metaService) {
        this.metaService = metaService;
    }

    @GetMapping("/meta")
    public Meta get(){
        return metaService.get();
    }

    @PutMapping("/meta")
    public Meta update(@RequestBody Meta meta){

        metaService.update(meta);

        return meta;
    }
}
