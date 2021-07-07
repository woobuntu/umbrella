package kr.withus1030.server.service;

import kr.withus1030.server.dao.NavigationDAO;
import kr.withus1030.server.entity.Gnb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class NavigationServiceImpl implements NavigationService {

    private NavigationDAO navigationDAO;

    @Autowired
    public NavigationServiceImpl(NavigationDAO navigationDAO) {
        this.navigationDAO = navigationDAO;
    }

    @Override
    @Transactional
    public List<Gnb> findAll() {

        return navigationDAO.findAll();
    }

}
