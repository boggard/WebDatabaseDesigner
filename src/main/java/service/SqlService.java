package service;

import dto.DBTable;

import java.util.List;

/**
 * @author boggard
 */
public interface SqlService {

    byte[] generateSql(List<DBTable> dbTables);
}
