package kr.withus1030.server.dao;

import kr.withus1030.server.entity.Organization;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class OrganizationDAOHibernateImpl implements OrganizationDAO{

    private EntityManager entityManager;

    @Autowired
    public OrganizationDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public Organization findByName(String name) {

        Session session = entityManager.unwrap(Session.class);

        Organization organization = session.get(Organization.class, name);

        return organization;
    }
}
