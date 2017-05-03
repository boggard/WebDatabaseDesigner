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
    public byte[] generateSql(List<DBTable> dbTables) {
        StringBuilder stringBuilder = new StringBuilder();
        StringBuilder primaryKey = new StringBuilder();
        for (DBTable dbTable : dbTables) {
            stringBuilder.append("CREATE TABLE ").append(dbTable.getName()).append(" (\n");
            for (DBTableField field : dbTable.getFields()) {
                stringBuilder.append("\t").append(field.getName()).append(" ").append(field.getType()).append(",\n");
                if (field.isPrimaryKey()) {
                    primaryKey.append(field.getName()).append(",");
                }
            }
            int index = primaryKey.lastIndexOf(",");

            stringBuilder.append("\tPRIMARY KEY (")
                    .append(index != -1 ? primaryKey.deleteCharAt(index) : primaryKey)
                    .append(")\n");
            stringBuilder.append(")");
        }
        return stringBuilder.toString().getBytes();
    }
}
