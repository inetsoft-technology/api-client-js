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
 * Sheet provides the properties of a viewsheet or worksheet.
 */
export interface Sheet {
   /**
    * The asset identifier for the sheet.
    */
   asset: string;

   /**
    * The path to the sheet.
    */
   path: string;

   /**
    * The display name for the sheet.
    */
   label: string;

   /**
    * A flag that indicates if the sheet is global or owned by a user.
    */
   global: boolean;

   /**
    * The user, if any, that owns the sheet.
    */
   user?: string;

   /**
    * The runtime identifier of the opened sheet.
    */
   identifier?: string;
}
