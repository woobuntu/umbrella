package kr.withus1030.server.dao;

import kr.withus1030.server.entity.History;

import java.util.List;

public interface HistoryDAO {

    public List<History> findAll();

    public History findById(int theId);

    public void save(History history);
}
