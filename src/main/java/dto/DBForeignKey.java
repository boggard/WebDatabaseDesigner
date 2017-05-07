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
}
