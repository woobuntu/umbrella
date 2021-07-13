package kr.withus1030.server.dao;

import kr.withus1030.server.entity.History;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class HistoryDAOHibernateImpl implements HistoryDAO{

    private EntityManager entityManager;

    @Autowired
    public HistoryDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<History> findAll() {

        Session session = entityManager.unwrap(Session.class);

        Query query = session.createQuery("from History", History.class);

        List<History> histories = query.getResultList();

        return histories;
    }

    @Override
    public History findById(int theId) {

        Session session = entityManager.unwrap(Session.class);

        History history = session.get(History.class, theId);

        return history;
    }

    @Override
    public void save(History history) {

        Session session = entityManager.unwrap(Session.class);

        session.saveOrUpdate(history);
    }
}
