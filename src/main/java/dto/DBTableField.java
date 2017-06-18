package dto;

/**
 * @author boggard
 */
public class DBTableField {

    private String name;
    private String type;
    private String defaultVal;
    private boolean primaryKey;
    private boolean foreignKey;
    private boolean notNull;
    private boolean unique;
    private boolean autoIncrement;

    public DBTableField() {

    }

    public DBTableField(String name, String type, boolean primaryKey) {
        this();
        this.name = name;
        this.type = type;
        this.primaryKey = primaryKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(boolean primaryKey) {
        this.primaryKey = primaryKey;
    }

    public boolean isForeignKey() {
        return foreignKey;
    }

    public void setForeignKey(boolean foreignKey) {
        this.foreignKey = foreignKey;
    }

    public boolean isNotNull() {
        return notNull;
    }

    public void setNotNull(boolean notNull) {
        this.notNull = notNull;
    }

    public boolean isUnique() {
        return unique;
    }

    public void setUnique(boolean unique) {
        this.unique = unique;
    }

    public boolean isAutoIncrement() {
        return autoIncrement;
    }

    public void setAutoIncrement(boolean autoIncrement) {
        this.autoIncrement = autoIncrement;
    }

    public String getDefaultVal() {
        return defaultVal;
    }

    public void setDefaultVal(String defaultVal) {
        this.defaultVal = defaultVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DBTableField that = (DBTableField) o;

        if (primaryKey != that.primaryKey) return false;
        if (foreignKey != that.foreignKey) return false;
        if (notNull != that.notNull) return false;
        if (unique != that.unique) return false;
        if (autoIncrement != that.autoIncrement) return false;
        if (!name.equals(that.name)) return false;
        if (!type.equals(that.type)) return false;
        return defaultVal != null ? defaultVal.equals(that.defaultVal) : that.defaultVal == null;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + type.hashCode();
        result = 31 * result + (defaultVal != null ? defaultVal.hashCode() : 0);
        result = 31 * result + (primaryKey ? 1 : 0);
        result = 31 * result + (foreignKey ? 1 : 0);
        result = 31 * result + (notNull ? 1 : 0);
        result = 31 * result + (unique ? 1 : 0);
        result = 31 * result + (autoIncrement ? 1 : 0);
        return result;
    }
}
