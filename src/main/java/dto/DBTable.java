package dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author boggard
 */
public class DBTable {

    private String name;
    private List<DBTableField> fields = new ArrayList<DBTableField>();
    private List<DBForeignKey> foreignKeys = new ArrayList<DBForeignKey>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DBTableField> getFields() {
        return fields;
    }

    public void setFields(List<DBTableField> fields) {
        this.fields = fields;
    }

    public List<DBForeignKey> getForeignKeys() {
        return foreignKeys;
    }

    public void setForeignKeys(List<DBForeignKey> foreignKeys) {
        this.foreignKeys = foreignKeys;
    }
}
