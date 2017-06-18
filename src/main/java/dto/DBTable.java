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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DBTable dbTable = (DBTable) o;

        if (!name.equals(dbTable.name)) return false;
        if (!fields.equals(dbTable.fields)) return false;
        return foreignKeys.equals(dbTable.foreignKeys);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + fields.hashCode();
        result = 31 * result + foreignKeys.hashCode();
        return result;
    }
}
