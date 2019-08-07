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
 * ViewsheetAPI provides operations for accessing viewsheets.
 */
export interface ViewsheetApi {
   /**
    * Gets the list of available viewsheets.
    *
    * @return the list of viewsheets.
    */
   getViewsheets(): Promise<Sheet[]>;

   /**
    * Gets the list of opened viewsheets.
    *
    * @return the list of opened viewsheets.
    */
   getOpenedViewsheets(): Promise<Sheet[]>;

   /**
    * Opens a viewsheet.
    *
    * @param assetId    the asset identifier of the viewsheet to open.
    * @param parameters a map of parameters to use when opening the viewsheet.
    *
    * @return the opened viewsheet information.
    */
   openViewsheet(assetId: string, parameters: {[name: string]: any}): Promise<Sheet>;

   /**
    * Gets information about an opened viewsheet.
    *
    * @param id the runtime identifier of the opened viewsheet.
    *
    * @return the opened viewsheet information.
    */
   getOpenedViewsheet(id: string): Promise<Sheet>;

   /**
    * Closes an opened viewsheet.
    *
    * @param id the runtime identifier of the opened viewsheet.
    */
   closeViewsheet(id: string): Promise<void>;

   /**
    * Sends an opened viewsheet in an email message.
    *
    * @param id         the runtime identifier of the opened viewsheet.
    * @param format     the file format for the attached viewsheet.
    * @param recipients the email addresses of the recipients of the message.
    * @param sender     the email address of the sender of the message.
    * @param subject    the subject line of the message.
    * @param message    the body of the message.
    */
   mailViewsheet(id: string, format: string, recipients: string[], sender: string, subject: string,
                 message: string): Promise<void>;

   /**
    * Exports an opened viewsheet.
    *
    * @param id       the runtime identifier of the opened viewsheet.
    * @param format   the format of the exported viewsheet.
    *
    * @return the binary content of the exported viewsheet.
    */
   exportViewsheet(id: string, format: string): Promise<ArrayBuffer>;
}
