package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Validator;

/**
 * @author boggard
 */

@Configuration
@ComponentScan(basePackages = {"controller"})
@Import({WebConfig.class})
@EnableWebMvc
public class AppConfig {
    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor() {

        MethodValidationPostProcessor processor =
                new MethodValidationPostProcessor();
        processor.setValidator(validator());
        return processor;
    }

    @Bean
    public Validator validator() {
        return new LocalValidatorFactoryBean();
    }

}
