package config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.util.TimeZone;

/**
 * @author boggard
 */
public class SpringInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class[] getRootConfigClasses() {
        return new Class[] { AppConfig.class };
    }

    @Override
    protected Class[] getServletConfigClasses() {
        return null;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        TimeZone.setDefault(TimeZone.getTimeZone("Europe/Moscow"));
        super.onStartup(servletContext);
    }
}

