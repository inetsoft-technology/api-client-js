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
import { AbstractClient } from "../abstract-client";
import { HttpAdapter } from "../http-adapter";
import { PermissionGrant, Report, ReportApi, ReportParameter } from "./report-api";

/**
 * @hidden
 */
export class ReportClient extends AbstractClient implements ReportApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getReports(): Promise<Report[]> {
      const url = "api/public/reports";
      return this.doGet(url).then((list: any) => list.reports);
   }

   public getOpenReports(): Promise<Report[]> {
      const url = "api/public/reports/open";
      return this.doGet(url).then((list: any) => list.reports);
   }

   public openReport(path: string, execute: boolean,
                     parameters: {[name: string]: any}): Promise<Report>
   {
      const request = { path, execute, parameters };
      const url = "api/public/reports/open";
      return this.doPost(url, request);
   }

   public getOpenedReport(id: string): Promise<Report> {
      const url = `api/public/reports/open/${id}`;
      return this.doGet(url);
   }

   public executeReport(id: string, parameters: {[name: string]: any}): Promise<void> {
      const request = { parameters };
      const url = `api/public/reports/open/${id}/execute`;
      return this.doPost(url, request);
   }

   public closeReport(id: string): Promise<void> {
      const url = `api/public/reports/open/${id}`;
      return this.doDelete(url);
   }

   public getReportPageCount(id: string): Promise<number> {
      const url = `api/public/reports/open/${id}/pages`;
      return this.doGet(url).then((count: any) => count.pages);
   }

   public mailReport(id: string, recipients: string[], sender: string, subject: string,
                     message: string, format: string): Promise<void>
   {
      const request = { recipients, sender, subject, message, format };
      const url = `api/public/reports/open/${id}/mail`;
      return this.doPost(url, request);
   }

   public printReport(id: string, printer: string, pages: number[]): Promise<void> {
      const request = { printer, pages };
      const url = `api/public/reports/open/${id}/print`;
      return this.doPost(url, request);
   }

   public exportReport(id: string, format: string): Promise<ArrayBuffer> {
      const url = `api/public/reports/open/${id}/export/${format}`;
      return this.doGetBinary(url);
   }

   public deployReport(file: ArrayBuffer, name: string, alias: string, description: string,
                       folder: string, visible: boolean, bursting: boolean, pregenerated: boolean,
                       cycle: string | null, overwrite: boolean, exportFormats: string[],
                       parameters: ReportParameter[], permissions: PermissionGrant[]): Promise<void>
   {
      const request = {
         data: fromByteArray(new Uint8Array(file)), name, alias, description, folder, visible,
         bursting, pregenerated, cycle, overwrite, exportFormats, parameters, permissions
      };
      const url = "api/public/reports/deploy";
      return this.doPost(url, request);
   }
}
