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

import { AbstractClient } from "../../abstract-client";
import { HttpAdapter } from "../../http-adapter";
import { Sheet } from "../sheet-api";
import { ViewsheetApi } from "./viewsheet-api";

/**
 * @hidden
 */
export class ViewsheetClient extends AbstractClient implements ViewsheetApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getViewsheets(): Promise<Sheet[]> {
      const url = "api/public/viewsheets";
      return this.doGet(url).then((list: any) => list.sheets);
   }

   public getOpenedViewsheets(): Promise<Sheet[]> {
      const url = "api/public/viewsheets/open";
      return this.doGet(url).then((list: any) => list.sheets);
   }

   public openViewsheet(assetId: string, parameters: { [p: string]: any }): Promise<Sheet> {
      const request = { asset: assetId, parameters };
      const url = "api/public/viewsheets/open";
      return this.doPost(url, request);
   }

   public getOpenedViewsheet(id: string): Promise<Sheet> {
      const url = `api/public/viewsheets/open/${id}`;
      return this.doGet(url);
   }

   public closeViewsheet(id: string): Promise<void> {
      const url = `api/public/viewsheets/open/${id}`;
      return this.doDelete(url);
   }

   public mailViewsheet(id: string, format: string, recipients: string[], sender: string,
                        subject: string, message: string): Promise<void>
   {
      const request = { format, recipients, sender, subject, message };
      const url = `api/public/viewsheets/open/${id}/mail`;
      return this.doPost(url, request);
   }

   public exportViewsheet(id: string, format: string): Promise<ArrayBuffer> {
      const url = `api/public/viewsheets/open/${id}/export/${format}`;
      return this.doGetBinary(url);
   }
}
