package kr.withus1030.server.rest;

import kr.withus1030.server.entity.History;
import kr.withus1030.server.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class HistoryRestController {

    private HistoryService historyService;

    @Autowired
    public HistoryRestController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/histories")
    public List<History> findAll(){

        List<History> histories = historyService.findAll();

        return histories;
    }

    @PostMapping("/histories")
    public History add(@RequestBody History history){

        history.setId(0);

        historyService.save(history);

        return history;
    }

    @PutMapping("/histories")
    public History update(@RequestBody History history){

        // History selectedById = historyService.findById(history.getId());
        // if(selectedById == null){
        //     throw new RuntimeException("해당 id의 내역이 존재하지 않습니다.");
        // }
        // A different object with the same identifier value was already associated with the session 에러 발생

        historyService.save(history);

        return history;
    }
}
