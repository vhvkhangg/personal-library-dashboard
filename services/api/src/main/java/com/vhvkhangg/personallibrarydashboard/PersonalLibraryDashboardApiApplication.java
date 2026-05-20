package com.vhvkhangg.personallibrarydashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PersonalLibraryDashboardApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(PersonalLibraryDashboardApiApplication.class, args);
  }
}
