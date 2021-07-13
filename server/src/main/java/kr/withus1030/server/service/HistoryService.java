package kr.withus1030.server.service;

import kr.withus1030.server.entity.History;

import java.util.List;

public interface HistoryService {

    public List<History> findAll();

    public History findById(int theId);

    public void save(History history);
}
