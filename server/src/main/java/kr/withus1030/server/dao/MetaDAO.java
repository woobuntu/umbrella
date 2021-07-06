package kr.withus1030.server.dao;

import kr.withus1030.server.entity.Meta;

public interface MetaDAO {

    public Meta findOnlyOne();

    public void save(Meta meta);
}
