package kr.withus1030.server.service;

import kr.withus1030.server.dao.HistoryDAO;
import kr.withus1030.server.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    private HistoryDAO historyDAO;

    @Autowired
    public HistoryServiceImpl(HistoryDAO historyDAO) {
        this.historyDAO = historyDAO;
    }

    @Override
    @Transactional
    public List<History> findAll() {
        return historyDAO.findAll();
    }

    @Override
    @Transactional
    public History findById(int theId) {

        History history = historyDAO.findById(theId);

        return history;
    }

    @Override
    @Transactional
    public void save(History history) {

        historyDAO.save(history);
    }
}
