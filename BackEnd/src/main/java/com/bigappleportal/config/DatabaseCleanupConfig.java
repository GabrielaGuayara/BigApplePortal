//package com.bigappleportal.config;
//
//
//
//import jakarta.annotation.PreDestroy;
//import org.slf4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.sql.DataSource;
//import java.sql.Connection;
//import java.sql.Statement;
//
//@Configuration
//public class DatabaseCleanupConfig {
//
//    @Autowired
//    private DataSource dataSource;
//
//    @Bean
//    public DatabaseCleanup databaseCleanup(){
//        return  new DatabaseCleanup(dataSource);
//    }
//
//
//    public static class DatabaseCleanup{
//        private DataSource dataSource;
//        private final Logger logger = org.slf4j.LoggerFactory.getLogger(DatabaseCleanup.class);
//
//        public DatabaseCleanup(DataSource dataSource){
//            this.dataSource = dataSource;
//        }
//
//        @PreDestroy
//        public void dropSpecificTables() {
//            String[] tables = {"user", "user_profiles", "apprenticeships", "applications"};
//
//            try (Connection connection = dataSource.getConnection()) {
//                Statement statement = connection.createStatement();
//
//                for (String table : tables) {
//                    statement.executeUpdate("DROP TABLE IF EXISTS " + table);
//                    logger.info("Dropped table: " + table);
//                }
//            } catch (Exception e) {
//                logger.error("Error dropping tables: ", e);
//            }
//        }
//    }
//}
