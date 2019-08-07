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
 * Report contains the properties of a report.
 */
export interface Report {
   /**
    * The path to the report.
    */
   path: string;

   /**
    * The display name of the report.
    */
   label?: string;

   /**
    * The runtime identifier of the opened report.
    */
   identifier?: string;
}

/**
 * ReportParameter contains the definition of a report initialization or creation parameter.
 */
export interface ReportParameter {
   /**
    * The type of the parameter. The allowable values are 'INITIALIZE' and 'CREATE'.
    */
   type: string;

   /**
    * The data type of the parameter value. The allowable values are 'string', 'boolean', 'float',
    * 'double', 'decimal', 'char', 'character', 'byte', 'short', 'integer', 'long', 'timeInstant',
    * 'date', and 'time'.
    */
   dataType: string;

   /**
    * The name of the parameter.
    */
   name: string;

   /**
    * The value of the parameter.
    */
   value: string;
}

/**
 * PermissionGrant contains a permission granted to an identity.
 */
export interface PermissionGrant {
   /**
    * The the name of the identity.
    */
   name: string;

   /**
    * The type of the identity. The allowable values are 'USER', 'GROUP', and 'ROLE'.
    */
   type: string;

   /**
    * The list of granted actions. The allowed values are 'READ', 'WRITE', 'DELETE', 'ACCESS',
    * 'ASSIGN', and 'ADMIN'.
    */
   actions: string[];
}

/**
 * ReportApi provides operations used to execute reports.
 */
export interface ReportApi {
   /**
    * Gets the list of reports.
    */
   getReports(): Promise<Report[]>;

   /**
    * Gets the list of opened reports.
    */
   getOpenReports(): Promise<Report[]>;

   /**
    * Opens a report.
    *
    * @param path       the path to the report to open.
    * @param execute    true to immediately execute the report; false otherwise. If false, a
    *                   subsequent call to executeReport() is required.
    * @param parameters the parameters to use when opening the report.
    *
    * @return the opened report.
    */
   openReport(path: string, execute: boolean, parameters: {[name: string]: any}): Promise<Report>;

   /**
    * Gets information about an opened report.
    *
    * @param id the identifier of the opened report.
    *
    * @return the opened report.
    */
   getOpenedReport(id: string): Promise<Report>;

   /**
    * Executes an opened report.
    *
    * @param id         the identifier of the opened report.
    * @param parameters the parameters to use when executing the report.
    */
   executeReport(id: string, parameters: {[name: string]: any}): Promise<void>;

   /**
    * Closes an opened report.
    *
    * @param id the identifier of the opened report.
    */
   closeReport(id: string): Promise<void>;

   /**
    * Gets the number of pages in a report.
    *
    * @param id the identifier of the opened report.
    *
    * @return the number of pages in the specified report.
    */
   getReportPageCount(id: string): Promise<number>;

   /**
    * Sends an opened report in an email message.
    *
    * @param id         the identifier of the opened report.
    * @param recipients the email addresses of the recipients of the message.
    * @param sender     the email address of the sender of the message.
    * @param subject    the subject line of the message.
    * @param message    the body of the email message.
    * @param format     the file format for the attached report.
    */
   mailReport(id: string, recipients: string[], sender: string, subject: string, message: string,
              format: string): Promise<void>;

   /**
    * Prints an opened report on the server.
    *
    * @param id      the identifier of the opened report.
    * @param printer the name of the server printer.
    * @param pages   the page numbers to print.
    */
   printReport(id: string, printer: string, pages: number[]): Promise<void>;

   /**
    * Exports an opened report.
    *
    * @param id       the identifier of the opened report.
    * @param format   the file format for the exported report.
    *
    * @return the binary content of the exported report.
    */
   exportReport(id: string, format: string): Promise<ArrayBuffer>;

   /**
    * Deploys a report to the repository.
    *
    * @param file          the binary content of the template file.
    * @param name          the name of the deployed report.
    * @param alias         the alias for the report.
    * @param description   a description of the report.
    * @param folder        the path to the parent folder of the report.
    * @param visible       a flag that indicates if the report is visible in the repository tree.
    * @param bursting      a flag that indicates if bursting is enabled for the report.
    * @param pregenerated  a flag that indicates if the report is pre-generated.
    * @param cycle         the name of the cycle to be used to pre-generate the report.
    * @param overwrite     a flag that indicates if an existing report should be overwritten.
    * @param exportFormats the list of export formats that are allowed for the report.
    * @param parameters    the initialization and creation parameters for the report.
    * @param permissions   the permissions granted on the report.
    */
   deployReport(file: ArrayBuffer, name: string, alias: string, description: string, folder: string,
                visible: boolean, bursting: boolean, pregenerated: boolean, cycle: string | null,
                overwrite: boolean, exportFormats: string[], parameters: ReportParameter[],
                permissions: PermissionGrant[]): Promise<void>;
}
