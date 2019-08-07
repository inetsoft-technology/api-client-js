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

import { DatabaseApi } from "./database/database-api";
import { DatabaseClient } from "./database/database-client";
import { DataSourceApi } from "./datasource/data-source-api";
import { DataSourceClient } from "./datasource/data-source-client";
import { FetchAdapter } from "./fetch-adapter";
import { FileApi } from "./file/file-api";
import { FileClient } from "./file/file-client";
import { HttpAdapter } from "./http-adapter";
import { PrinterApi } from "./printer/printer-api";
import { PrinterClient } from "./printer/printer-client";
import { ReportApi } from "./report/report-api";
import { ReportClient } from "./report/report-client";
import { ScheduleApi } from "./schedule/schedule-api";
import { ScheduleClient } from "./schedule/schedule-client";
import { ServerApi } from "./server/server-api";
import { ServerClient } from "./server/server-client";
import { ViewsheetApi } from "./sheet/viewsheet/viewsheet-api";
import { ViewsheetClient } from "./sheet/viewsheet/viewsheet-client";
import { WorksheetApi } from "./sheet/worksheet/worksheet-api";
import { WorksheetClient } from "./sheet/worksheet/worksheet-client";

/**
 * @hidden
 */
class TokenProvider {
   private token: string | undefined;

   constructor(private serverUrl: string, private username: string | null,
               private password: string | null, private adapter: HttpAdapter<any>)
   {
   }

   public get(): Promise<string> {
      if(this.token) {
         return Promise.resolve(this.token);
      }

      const url = `${this.serverUrl}api/public/login`;
      let response: Promise<any> | undefined;

      if(this.username) {
         const data = {
            username: this.username,
            password: this.password
         };
         response = this.adapter.post(url, data);
      }
      else {
         response = this.adapter.get(url);
      }

      return this.adapter.map<{token: string}>(response).then(data => {
         this.token = data.token;
         return data.token;
      });
   }
}

/**
 * ApiClient is the client for the InetSoft Web APIs.
 */
export interface ApiClient {
   /**
    * The database API client.
    */
   database: DatabaseApi;

   /**
    * The data source API client.
    */
   dataSource: DataSourceApi;

   /**
    * The file API client.
    */
   file: FileApi;

   /**
    * The printer API client.
    */
   printer: PrinterApi;

   /**
    * The report API client.
    */
   report: ReportApi;

   /**
    * The schedule API client.
    */
   schedule: ScheduleApi;

   /**
    * The server API client.
    */
   server: ServerApi;

   /**
    * The viewsheet API client.
    */
   viewsheet: ViewsheetApi;

   /**
    * The worksheet API client.
    */
   worksheet: WorksheetApi;
}

/**
 * Implementation of the ApiClient interface.
 *
 * @hidden
 */
class ApiClientImpl implements ApiClient {

   public readonly database: DatabaseApi;
   public readonly dataSource: DataSourceApi;
   public readonly file: FileApi;
   public readonly printer: PrinterApi;
   public readonly report: ReportApi;
   public readonly schedule: ScheduleApi;
   public readonly server: ServerApi;
   public readonly viewsheet: ViewsheetApi;
   public readonly worksheet: WorksheetApi;

   constructor(serverUrl: string, username: string | null, password: string | null,
               adapter: HttpAdapter<any> | null)
   {
      adapter = adapter || new FetchAdapter();
      const provider = new TokenProvider(serverUrl, username, password, adapter);
      const token = () => provider.get();
      this.database = new DatabaseClient(adapter, token, serverUrl);
      this.dataSource = new DataSourceClient(adapter, token, serverUrl);
      this.file = new FileClient(adapter, token, serverUrl);
      this.printer = new PrinterClient(adapter, token, serverUrl);
      this.report = new ReportClient(adapter, token, serverUrl);
      this.schedule = new ScheduleClient(adapter, token, serverUrl);
      this.server = new ServerClient(adapter, token, serverUrl);
      this.viewsheet = new ViewsheetClient(adapter, token, serverUrl);
      this.worksheet = new WorksheetClient(adapter, token, serverUrl);
   }
}

/**
 * Creates a new instance of ApiClient.
 *
 * @param serverUrl the base URL of the InetSoft server.
 * @param username  the user name used to authenticate with the server. This parameter is not
 *                  required if anonymous access is allowed or if the user is already
 *                  authenticated in the enclosing web page.
 * @param password  the password used to authenticate with the server.
 * @param adapter   the adapter for the HTTP client. If not specified, this will use the fetch API.
 *
 * @return an new API client instance.
 */
export function createApiClient(serverUrl: string, username: string | null = null,
                                password: string | null = null,
                                adapter: HttpAdapter<any> | null = null): ApiClient {
   if(!serverUrl || !serverUrl.length) {
      throw new Error("The serverUrl parameter is required");
   }

   if(serverUrl[serverUrl.length - 1] !== "/") {
      serverUrl = serverUrl + "/";
   }

   return new ApiClientImpl(serverUrl, username, password, adapter);
}
