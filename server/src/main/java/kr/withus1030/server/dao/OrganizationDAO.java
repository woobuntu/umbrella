package kr.withus1030.server.dao;

import kr.withus1030.server.entity.Organization;

import java.util.List;

public interface OrganizationDAO {

    public Organization findByName(String name);
}
