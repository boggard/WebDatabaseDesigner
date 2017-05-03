package dto;

/**
 * @author boggard
 */
public class CustomHttpResponse {

    private byte[] data;

    public CustomHttpResponse(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }
}
