package service.impl;

import dto.DBForeignKey;
import dto.DBTable;
import dto.DBTableField;
import org.springframework.stereotype.Service;
import service.SqlService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
                        .append(field.isAutoIncrement() ? "AUTO_INCREMENT" : "").append(" ")
                        .append(field.isUnique() ? "UNIQUE" : "").append(" ")
                        .append(field.isNotNull() ? "NOT NULL" : "").append(" ")
                        .append(field.getDefaultVal() != null ? "DEFAULT '" + field.getDefaultVal() + "'" : "").append(",\n");
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

    @Override
    public List<DBTable> parseSql(String sql) {
        String[] instructions = sql.split(";");
        List<DBTable> tables = new ArrayList<DBTable>();
        for (String instruction : instructions) {
            if (instruction.toLowerCase().contains("create table")) {
                tables.add(parseTable(instruction));
            }
        }
        for (DBTable table : tables) {
            for (DBForeignKey dbForeignKey : table.getForeignKeys()) {
                DBTable dbTable = tables.stream().filter(t -> Objects.equals(t.getName(), dbForeignKey.getTable().getName())).findFirst().get();
                dbForeignKey.setTable(dbTable);
                dbForeignKey.setForeignField(dbTable.getFields().stream().filter(f -> Objects.equals(f.getName(), dbForeignKey.getForeignField().getName())).findFirst().get());
            }
        }
        return tables;
    }

    private DBTable parseTable(String instruction) {
        DBTable table = new DBTable();
        Pattern pattern = Pattern.compile("CREATE TABLE (.+) \\(");
        Matcher matcher = pattern.matcher(instruction);
        if (matcher.find()) {
            table.setName(matcher.group(1));
        }
        pattern = Pattern.compile("\\((.*?)\\s\\)", Pattern.DOTALL);
        matcher = pattern.matcher(instruction);
        String[] fields = null;
        if (matcher.find()) {
            fields = matcher.group(1).split(",");
            for (String field : fields) {
                DBTableField tableField = parseField(field, table);
                if (tableField != null) {
                    table.getFields().add(tableField);
                }
            }
        }
        return table;
    }

    private DBTableField parseField(String field, DBTable table) {
        DBTableField tableField = new DBTableField();
        String[] options = field.split(" ");
        tableField.setName(options[0].trim());
        tableField.setType(options[1]);
        if (field.contains("NOT NULL")) {
            tableField.setNotNull(true);
        }
        if (field.contains("UNIQUE")) {
            tableField.setUnique(true);
        }
        if (field.contains("AUTO_INCREMENT")) {
            tableField.setAutoIncrement(true);
        }
        if (field.contains("PRIMARY KEY")) {
            Pattern pattern = Pattern.compile("\\((\\w+)\\)");
            Matcher matcher = pattern.matcher(field);
            matcher.find();
            table.getFields().stream()
                    .filter(f -> Objects.equals(f.getName(), matcher.group(1)))
                    .findFirst()
                    .get()
                    .setPrimaryKey(true);
            return null;
        }
        if (field.contains("FOREIGN KEY")) {
            Pattern pattern = Pattern.compile("\\((\\w+)\\)");
            Matcher matcher = pattern.matcher(field);
            matcher.find();
            tableField = table.getFields().stream()
                    .filter(f -> Objects.equals(f.getName(), matcher.group(1)))
                    .findFirst()
                    .get();
            tableField.setForeignKey(true);
            DBForeignKey foreignKey = new DBForeignKey();
            foreignKey.setField(tableField);

            DBTableField foreignField = new DBTableField();
            matcher.find();
            foreignField.setName(matcher.group(1));
            foreignKey.setForeignField(foreignField);

            pattern = Pattern.compile("REFERENCES (\\w+)[\\s(]");
            Matcher matcher1 = pattern.matcher(field);
            matcher1.find();
            DBTable foreignTable = new DBTable();
            foreignTable.setName(matcher1.group(1));
            foreignKey.setTable(foreignTable);

            table.getForeignKeys().add(foreignKey);

            return null;
        }
        return tableField;
    }
}