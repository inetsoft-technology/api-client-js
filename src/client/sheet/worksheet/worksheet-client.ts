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

import { fromByteArray } from "base64-js";
import { AbstractClient } from "../../abstract-client";
import { HttpAdapter } from "../../http-adapter";
import { Sheet } from "../sheet-api";
import { TableData, WorksheetApi, WorksheetParameter } from "./worksheet-api";

/**
 * @hidden
 */
export class WorksheetClient extends AbstractClient implements WorksheetApi {

   private static encodeId(id: string): string {
      const utf8String = unescape(encodeURIComponent(id));
      const utf8Array = new Uint8Array(utf8String.length);

      for (let i = 0; i < utf8String.length; i++) {
         utf8Array[i] = utf8String.charCodeAt(i);
      }

      return fromByteArray(utf8Array);
   }

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getWorksheets(): Promise<Sheet[]> {
      const url = "api/public/worksheets";
      return this.doGet(url).then((list: any) => list.sheets);
   }

   public getWorksheetParameters(id: string): Promise<WorksheetParameter[]> {
      const encodedId = WorksheetClient.encodeId(id);
      const url = `api/public/worksheets/parameters/${encodedId}`;
      return this.doGet(url).then((list: any) => list.parameters);
   }

   public getWorksheetMetadata(id: string): Promise<TableData> {
      const encodedId = WorksheetClient.encodeId(id);
      const url = `api/public/worksheets/metadata/${encodedId}`;
      return this.doGet(url);
   }

   public getOpenedWorksheets(): Promise<Sheet[]> {
      const url = "api/public/worksheets/open";
      return this.doGet(url).then((list: any) => list.sheets);
   }

   public openWorksheet(asset: string, parameters: { [p: string]: any }): Promise<Sheet> {
      const request = { asset, parameters };
      const url = "api/public/worksheets/open";
      return this.doPost(url, request);
   }

   public getOpenedWorksheet(id: string): Promise<Sheet> {
      const url = `api/public/worksheets/open/${id}`;
      return this.doGet(url);
   }

   public closeWorksheet(id: string): Promise<void> {
      const url = `api/public/worksheets/open/${id}`;
      return this.doDelete(url);
   }

   public getWorksheetData(id: string, from: number, rows: number): Promise<TableData> {
      const url = `api/public/worksheets/open/${id}/data`;
      const params = { from: `${from}`, rows: `${rows}` };
      return this.doGet(url, params);
   }
}
