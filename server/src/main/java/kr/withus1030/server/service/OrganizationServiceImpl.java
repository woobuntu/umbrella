package kr.withus1030.server.service;

import kr.withus1030.server.dao.OrganizationDAO;
import kr.withus1030.server.entity.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationServiceImpl implements OrganizationService{

    private OrganizationDAO organizationDAO;

    @Autowired
    public OrganizationServiceImpl(OrganizationDAO organizationDAO) {
        this.organizationDAO = organizationDAO;
    }


    @Override
    public Organization getTree() {
        return organizationDAO.findByName("총회");
    }
}
