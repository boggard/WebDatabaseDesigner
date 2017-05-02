package service.impl;

import dto.DBTable;
import dto.DBTableField;
import org.springframework.stereotype.Service;
import service.SqlService;

import java.util.List;

/**
 * @author boggard
 */
@Service
public class SqlServiceImpl implements SqlService {
    @Override
    public StringBuilder generateSql(List<DBTable> dbTables) {
        StringBuilder stringBuilder = new StringBuilder();
        StringBuilder primaryKey = new StringBuilder();
        for (DBTable dbTable : dbTables) {
            stringBuilder.append("CREATE TABLE ").append(dbTable.getName()).append(" (");
            for (DBTableField field : dbTable.getFields()) {
                stringBuilder.append(field.getName()).append(" ").append(field.getType()).append(",");
                if (field.isPrimaryKey()) {
                    primaryKey.append(field.getName()).append(",");
                }
            }
            stringBuilder.append("PRIMARY KEY (")
                    .append(primaryKey.deleteCharAt(primaryKey.lastIndexOf(",")))
                    .append(")");
            stringBuilder.append(")");
        }
        return stringBuilder;
    }
}
