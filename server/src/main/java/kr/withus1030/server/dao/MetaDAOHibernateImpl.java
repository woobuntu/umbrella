package kr.withus1030.server.dao;

import kr.withus1030.server.entity.Meta;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class MetaDAOHibernateImpl implements MetaDAO {

    private EntityManager entityManager;

    @Autowired
    public MetaDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Meta get() {

        Session currentSession = entityManager.unwrap(Session.class);

        Meta meta = currentSession.get(Meta.class, "함께쓰는우산");

        return meta;
    }

    @Override
    public void update(Meta meta) {

        Session currentSession = entityManager.unwrap(Session.class);

        meta.setName("함께쓰는우산");

        currentSession.update(meta);
    }
}
