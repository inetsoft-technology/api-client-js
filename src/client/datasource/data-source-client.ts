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

import { AbstractClient } from "../abstract-client";
import { HttpAdapter } from "../http-adapter";
import { DataSourceApi, DataSourceDescription, DataSourceProperties } from "./data-source-api";

/**
 * @hidden
 */
export class DataSourceClient extends AbstractClient implements DataSourceApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getDataSources(): Promise<DataSourceDescription[]> {
      const url = "api/public/dataSources";
      return this.doGet(url).then((list: any) => list.dataSources);
   }

   public getDataSource(name: string): Promise<DataSourceProperties | null> {
      return this.findDataSource(name);
   }

   public updateDataSource(name: string, properties: DataSourceProperties): Promise<void> {
      return this.getId(name).then(id => {
         if (id) {
            const url = `api/public/dataSources/${id}`;
            return this.doPut<void>(url, properties);
         }

         return Promise.reject(`Data source not found: '${name}'`);
      });
   }

   public deleteDataSource(name: string, force: boolean = false): Promise<void> {
      return this.getId(name).then(id => {
         if (id) {
            const url = `api/public/dataSources/${id}`;
            const params = {force: force ? "true" : "false"};
            return this.doDelete<void>(url, params);
         }

         return Promise.reject(`Data source not found: '${name}'`);
      });
   }

   private findDataSource(name: string): Promise<DataSourceProperties | null> {
      const url = "api/public/dataSources";
      const params = { name };
      return this.doGet<any>(url, params).then(list => {
         if (list.dataSources.length === 0) {
            return null;
         }

         return list.dataSources[0];
      });
   }

   private getId(name: string): Promise<string | null> {
      return this.findDataSource(name).then(ds => ds ? ds.id : null);
   }
}
