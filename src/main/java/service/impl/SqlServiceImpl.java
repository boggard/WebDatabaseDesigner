package service.impl;

import dto.DBForeignKey;
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
        for (DBTable dbTable : dbTables) {
            StringBuilder primaryKey = new StringBuilder();
            StringBuilder foreignKeys = new StringBuilder();
            stringBuilder.append("CREATE TABLE ").append(dbTable.getName()).append(" (\n");
            for (DBTableField field : dbTable.getFields()) {
                stringBuilder.append("\t")
                        .append(field.getName()).append(" ")
                        .append(field.getType()).append(" ")
                        .append(field.isNotNull() ? "NOT NULL" : "").append(",\n");
                if (field.isPrimaryKey()) {
                    primaryKey.append(field.getName()).append(",");
                }
            }
            if (primaryKey.length() > 0) {
                int index = primaryKey.lastIndexOf(",");

                stringBuilder.append("\tPRIMARY KEY (")
                        .append(index != -1 ? primaryKey.deleteCharAt(index) : primaryKey)
                        .append("),\n");
            }
            for (DBForeignKey foreignKey : dbTable.getForeignKeys()) {
                stringBuilder.append("\tFOREIGN KEY (").append(foreignKey.getField().getName()).append(") ").append("REFERENCES ").append(foreignKey.getTable().getName()).append(" (").append(foreignKey.getForeignField().getName()).append("),\n");
            }
            stringBuilder.deleteCharAt(stringBuilder.lastIndexOf(","));
            stringBuilder.append(");\n");
        }
        return stringBuilder.toString().getBytes();
    }
}