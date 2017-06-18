import dto.DBForeignKey;
import dto.DBTable;
import dto.DBTableField;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import service.SqlService;
import service.impl.SqlServiceImpl;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by boggard on 18.06.17.
 */

public class SqlServiceTest {

    private static String SQL = "CREATE TABLE Users (\n" +
            "\tid BIG_INT    ,\n" +
            "\tname VARCHAR    ,\n" +
            "\tid_role BIG_INT    ,\n" +
            "\tPRIMARY KEY (id),\n" +
            "\tFOREIGN KEY (id_role) REFERENCES Role (id)\n" +
            ");\n" +
            "CREATE TABLE Role (\n" +
            "\tid BIG_INT    ,\n" +
            "\trole VARCHAR    ,\n" +
            "\tPRIMARY KEY (id)\n" +
            ");\n";
    private static List<DBTable> tableList = buildTables();
    private SqlService sqlService = new SqlServiceImpl();

    private static List<DBTable> buildTables() {
        List<DBTable> tableList = new ArrayList<>();

        DBTable users = new DBTable();
        users.setName("Users");

        DBTableField id = new DBTableField("id", "BIG_INT", true);
        DBTableField name = new DBTableField("name", "VARCHAR", false);
        DBTableField idRole = new DBTableField("id_role", "BIG_INT", false);
        users.getFields().add(id);
        users.getFields().add(name);
        users.getFields().add(idRole);

        DBTable role = new DBTable();
        role.setName("Role");

        DBTableField roleField = new DBTableField("role", "VARCHAR", false);
        role.getFields().add(id);
        role.getFields().add(roleField);

        DBForeignKey dbForeignKey = new DBForeignKey();
        dbForeignKey.setField(idRole);
        dbForeignKey.setTable(role);
        dbForeignKey.setForeignField(id);
        users.getForeignKeys().add(dbForeignKey);

        tableList.add(users);
        tableList.add(role);

        return tableList;
    }

    @Test
    public void generateSql() {
        Assert.assertArrayEquals(SQL.getBytes(), sqlService.generateSql(tableList));
    }

    @Test
    public void parseSql() {
        Assert.assertArrayEquals(SQL.getBytes(), sqlService.generateSql(sqlService.parseSql(SQL)));
    }
}
