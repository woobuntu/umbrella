package kr.withus1030.server.service;

import kr.withus1030.server.dao.MetaDAO;
import kr.withus1030.server.entity.Meta;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

public class MetaServiceImpl implements MetaService {

    private MetaDAO metaDAO;

    @Autowired
    public MetaServiceImpl(MetaDAO metaDAO) {
        this.metaDAO = metaDAO;
    }

    @Override
    @Transactional
    public Meta get() {
        return metaDAO.get();
    }

    @Override
    @Transactional
    public void update(Meta meta) {
        metaDAO.update(meta);
    }
}
