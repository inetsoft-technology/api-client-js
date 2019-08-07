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
 * DataSourceDescription contains a description of a data source.
 */
export interface DataSourceDescription {
   /**
    * The unique identifier of the data source.
    */
   id: string;

   /**
    * The name of the data source.
    */
   name: string;

   /**
    * The type of the data source.
    */
   type: string;
}

/**
 * DataSourceProperties contains the properties of a data source definition.
 */
export interface DataSourceProperties {
   /**
    * The unique identifier of the data source.
    */
   id: string;

   /**
    * The name of the data source.
    */
   name: string;

   /**
    * The type of the data source. Allowed values are 'jdbc', 'soap', 'text', 'xml', and 'tabular'.
    */
   type: string;
}

/**
 * JdbcDataSourceProperties contains the properties of a JDBC data source definition.
 */
export interface JdbcDataSourceProperties extends DataSourceProperties {
   /**
    * The JDBC URL of the database.
    */
   url: string;

   /**
    * The fully-qualified class name of the JDBC driver.
    */
   driver: string;

   /**
    * A flag that indicates if the database requires authentication.
    */
   requireLogin: boolean;

   /**
    * The user name used to authenticate with the database.
    */
   user?: string;

   /**
    * The password used to authenticate with the database.
    */
   password?: string;

   /**
    * The name of the default database.
    */
   defaultDatabase?: string;
}

/**
 * SoapDataSourceProperties contains the properties of a SOAP data source definition.
 */
export interface SoapDataSourceProperties extends DataSourceProperties {
   /**
    * The URL of the SOAP service.
    */
   url: string;

   /**
    * A flag that indicates if the SOAP service requires authentication.
    */
   requireLogin: boolean;

   /**
    * The user name used to authenticate with the SOAP service.
    */
   user?: string;

   /**
    * The password used to authenticate with the SOAP service.
    */
   password?: string;

   /**
    * The fully-qualified class name of the SOAP server object interface.
    */
   serverClass: string;
}

/**
 * TextDataSourceProperties contains the properties of a text data source definition.
 */
export interface TextDataSourceProperties extends DataSourceProperties {
   /**
    * The URL of the text file.
    */
   url: string;

   /**
    * The HTTP method used to retrieve the text file. This property is only used if the URL protocol
    * is http or https.
    */
   method?: string;
}

/**
 * XmlDataSourceProperties contains the properties of an XML data source definition.
 */
export interface XmlDataSourceProperties extends DataSourceProperties {
   /**
    * The URL of the XML file.
    */
   url: string;

   /**
    * The HTTP method used to retrieve the XML file. This property is only used if the URL protocol
    * is http or https.
    */
   method?: string;
}

/**
 * TabularDataSourceProperties contains the properties of a tabular data source definition.
 */
export interface TabularDataSourceProperties extends DataSourceProperties {
   /**
    * The tabular sub-type of the data source.
    */
   tabularType: string;
}

/**
 * DataSourceApi provides operations used to list and manage data sources.
 */
export interface DataSourceApi {
   /**
    * Gets the list of data sources.
    *
    * @return the data sources.
    */
   getDataSources(): Promise<DataSourceDescription[]>;

   /**
    * Gets the properties of a data source.
    *
    * @param name the name of the data source.
    *
    * @return the data source properties.
    */
   getDataSource(name: string): Promise<DataSourceProperties | null>;

   /**
    * Updates the properties of an existing data source.
    *
    * @param name       the name of the data source.
    * @param properties the modified data source properties.
    */
   updateDataSource(name: string, properties: DataSourceProperties): Promise<void>;

   /**
    * Deletes a data source.
    *
    * @param name  the name of the data source.
    * @param force a flag indicating if the data source should be deleted even if it is used by a
    *              query.
    */
   deleteDataSource(name: string, force?: boolean): Promise<void>;
}
