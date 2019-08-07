/*
 * Copyright 2019 InetSoft Technology
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * DatasourceProperties contains the properties of the configuration database connection.
 */
export interface DatabaseProperties {
   /**
    * The type of database. The allowed values are 'DB2', 'DERBY', 'H2', 'MYSQL', 'ORACLE',
    * 'POSTGRESQL', and 'SQL_SERVER'.
    */
   type: string;

   /**
    * The fully-qualified class name of the JDBC driver.
    */
   driver: string;

   /**
    * The JDBC URL of the database.
    */
   url: string;

   /**
    * The name of the default database or catalog. If not specified, the default database for the
    * login will be used.
    */
   defaultDatabase?: string;

   /**
    * The transaction isolation level for the database. The allowed values are 'READ UNCOMMITTED',
    * 'READ COMMITTED', 'REPEATABLE READ', and 'SERIALIZABLE'.
    */
   isolationLevel: string;

   /**
    * A flag that indicates if the database requires authentication.
    */
   requireLogin: boolean;

   /**
    * The user name used to authenticate with the database.
    */
   username?: string;

   /**
    * The password used to authenticate with the database.
    */
   password?: string;

   /**
    * The connection status of the database.
    */
   status?: string;
}

/**
 * DatabaseApi provides operations used to manage the configuration database.
 */
export interface DatabaseApi {
   /**
    * Gets the configuration database settings.
    *
    * @return the database settings.
    */
   getDatabase(): Promise<DatabaseProperties>;

   /**
    * Sets the configuration database settings.
    *
    * @param properties the database settings.
    *
    * @return the updated database settings.
    */
   setDatabase(properties: DatabaseProperties): Promise<DatabaseProperties>;

   /**
    * Installs the database schema. It is typically unnecessary to call this, as it is done
    * automatically.
    */
   installSchema(): Promise<void>;

   /**
    * Uninstalls the database schema. Extreme caution should be used when uninstalling the schema.
    * It causes all data to be irrevocably lost. It should never be done on a database that is
    * currently being used as a data space because it will make that server unusable.
    */
   uninstallSchema(): Promise<void>;
}
