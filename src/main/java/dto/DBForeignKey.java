package dto;

/**
 * @author boggard
 */
public class DBForeignKey {

    private DBTableField field;
    private DBTable table;
    private DBTableField foreignField;

    public DBTable getTable() {
        return table;
    }

    public void setTable(DBTable table) {
        this.table = table;
    }

    public DBTableField getForeignField() {
        return foreignField;
    }

    public void setForeignField(DBTableField foreignField) {
        this.foreignField = foreignField;
    }

    public DBTableField getField() {
        return field;
    }

    public void setField(DBTableField field) {
        this.field = field;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DBForeignKey that = (DBForeignKey) o;

        if (!field.equals(that.field)) return false;
        if (!table.equals(that.table)) return false;
        return foreignField.equals(that.foreignField);
    }

    @Override
    public int hashCode() {
        int result = field.hashCode();
        result = 31 * result + table.hashCode();
        result = 31 * result + foreignField.hashCode();
        return result;
    }
}
