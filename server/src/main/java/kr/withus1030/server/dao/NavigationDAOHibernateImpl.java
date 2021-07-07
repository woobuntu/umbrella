package kr.withus1030.server.dao;

import kr.withus1030.server.entity.Gnb;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class NavigationDAOHibernateImpl implements NavigationDAO {

    private EntityManager entityManager;

    @Autowired
    public NavigationDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Gnb> findAll() {

        Session session = entityManager.unwrap(Session.class);

        Query<Gnb> query = session.createQuery("from Gnb", Gnb.class);

        List<Gnb> navigations = query.getResultList();

        return navigations;
    }
}
