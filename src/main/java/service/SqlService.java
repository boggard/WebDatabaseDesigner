package service;

import dto.DBTable;

import java.util.List;

/**
 * @author boggard
 */
public interface SqlService {

    StringBuilder generateSql(List<DBTable> dbTables);
}
