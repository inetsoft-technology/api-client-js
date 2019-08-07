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

import { HttpAdapter } from "./http-adapter";

/**
 * @hidden
 */
export abstract class AbstractClient {

   private get headers(): Promise<{[name: string]: string}> {
      return this.token().then((t) => ({ "X-Inetsoft-Api-Token": t }));
   }

   protected constructor(private adapter: HttpAdapter<any>, private token: () => Promise<string>,
                         private baseUrl: string) {}

   protected doGet<T>(url: string, params?: { [p: string]: string }): Promise<T> {
      return this.headers.then((h) =>
         this.adapter.map<T>(this.adapter.get(this.getUrl(url), params, h)));
   }

   protected doGetBinary(url: string, params?: { [p: string]: string }): Promise<ArrayBuffer> {
      return this.headers.then((h) =>
         this.adapter.mapBinary(this.adapter.get(this.getUrl(url), params, h)));
   }

   protected doPost<T>(url: string, data?: any, params?: { [p: string]: string }): Promise<T> {
      return this.headers.then((h) =>
         this.adapter.map<T>(this.adapter.post(this.getUrl(url), data, params, h)));
   }

   protected doPostBinary(url: string, data?: any,
                          params?: { [p: string]: string }): Promise<ArrayBuffer>
   {
      return this.headers.then((h) =>
         this.adapter.mapBinary(this.adapter.post(this.getUrl(url), data, params, h)));
   }

   protected doPut<T>(url: string, data?: any, params?: { [p: string]: string }): Promise<T> {
      return this.headers.then((h) =>
         this.adapter.map<T>(this.adapter.put(this.getUrl(url), data, params, h)));
   }

   protected doDelete<T>(url: string, params?: { [p: string]: string }): Promise<T> {
      return this.headers.then((h) =>
         this.adapter.map<T>(this.adapter.delete(this.getUrl(url), params, h)));
   }

   private getUrl(relativeUrl: string): string {
      return `${this.baseUrl}${relativeUrl}`;
   }
}
