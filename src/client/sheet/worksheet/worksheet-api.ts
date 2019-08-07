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

import { Sheet } from "../sheet-api";

/**
 * WorksheetParameter describes a parameter used when opening a worksheet.
 */
export interface WorksheetParameter {
   /**
    * The name of the parameter.
    */
   name: string;

   /**
    * The data type of the parameter. The allowable values are 'boolean', 'float', 'double',
    * 'character', 'byte', 'short', 'integer', 'long', 'date', 'time', and 'datetime'.
    */
   type: string;
}

/**
 * TableDataRow contains the data of a single worksheet row.
 */
export interface TableDataRow {
   /**
    * The data values in the row. The actual type of these values may be a string, number or
    * boolean.
    */
   values: any[];
}

/**
 * TableData contains rows of worksheet data.
 */
export interface TableData {
   /**
    * The number of rows in the table.
    */
   rowCount: number;

   /**
    * The number of columns in the table.
    */
   colCount: number;

   /**
    * The number of header rows in the table.
    */
   headerRowCount: number;

   /**
    * The number of header columns in the table.
    */
   headerColCount: number;

   /**
    * The number of footer rows in the table.
    */
   trailerRowCount: number;

   /**
    * The number of summary columns in the table.
    */
   trailerColCount: number;

   /**
    * Unique identifiers for each column.
    */
   colIdentifiers: string[];

   /**
    * The data types for each column. The possible values are 'boolean', 'float', 'double',
    * 'character', 'byte', 'short', 'integer', 'long', 'date', 'time', and 'datetime'.
    */
   colTypes: string[];

   /**
    * The rows of data.
    */
   rows: TableDataRow[];
}

/**
 * WorksheetApi provides operations to access worksheets.
 */
export interface WorksheetApi {
   /**
    * Gets the list of available worksheets.
    *
    * @return the list of worksheets.
    */
   getWorksheets(): Promise<Sheet[]>;

   /**
    * Gets the parameters for a worksheet.
    *
    * @param id the asset identifier of the worksheet.
    *
    * @return the worksheet parameters.
    */
   getWorksheetParameters(id: string): Promise<WorksheetParameter[]>;

   /**
    * Gets the meta data for a worksheet.
    *
    * @param id the asset identifier of the worksheet.
    *
    * @return the worksheet metadata.
    */
   getWorksheetMetadata(id: string): Promise<TableData>;

   /**
    * Gets the list of opened worksheets.
    *
    * @return the list of opened worksheets.
    */
   getOpenedWorksheets(): Promise<Sheet[]>;

   /**
    * Opens a worksheet.
    *
    * @param asset      the asset identifier of the worksheet.
    * @param parameters the parameters to use when opening the sheet.
    *
    * @return the worksheet was opened successfully.
    */
   openWorksheet(asset: string, parameters: {[name: string]: any}): Promise<Sheet>;

   /**
    * Gets information about an opened worksheet.
    *
    * @param id the runtime identifier of the opened worksheet.
    *
    * @return the opened worksheet information.
    */
   getOpenedWorksheet(id: string): Promise<Sheet>;

   /**
    * Closes an opened worksheet.
    *
    * @param id the runtime identifier of the opened worksheet.
    */
   closeWorksheet(id: string): Promise<void>;

   /**
    * Gets a block of rows from an opened worksheet.
    *
    * @param id   the runtime identifier of the opened worksheet.
    * @param from the starting, zero-based row number for the returned data. If not specified, 0
    *             will be used.
    * @param rows the number of rows to return. Fewer rows may be returned if the end of the table
    *             is reached.
    *
    * @return the worksheet data rows.
    */
   getWorksheetData(id: string, from: number, rows: number): Promise<TableData>;
}
