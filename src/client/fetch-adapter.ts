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
export class FetchAdapter implements HttpAdapter<Response> {
   public get(url: string, params?: { [p: string]: string },
              headers?: { [p: string]: string }): Promise<Response>
   {
      const init = {method: "GET", headers};
      return fetch(this.appendParameters(url, params), init);
   }

   public post(url: string, body?: any, params?: { [p: string]: string },
               headers?: { [p: string]: string }): Promise<Response>
   {
      const init = {
         body: JSON.stringify(body),
         headers,
         method: "POST"
      };
      return fetch(this.appendParameters(url, params), init);
   }

   public put(url: string, body?: any, params?: { [p: string]: string },
              headers?: { [p: string]: string }): Promise<Response>
   {
      const init = {
         body: JSON.stringify(body),
         headers,
         method: "PUT"
      };
      return fetch(this.appendParameters(url, params), init);
   }

   public delete(url: string, params?: { [p: string]: string },
                 headers?: { [p: string]: string }): Promise<Response>
   {
      const init = {method: "DELETE", headers};
      return fetch(this.appendParameters(url, params), init);
   }

   public map<T>(response: Promise<Response>): Promise<T> {
      return response.then((r) => r.json());
   }

   public mapText(response: Promise<Response>): Promise<string> {
      return response.then((r) => r.text());
   }

   public mapBinary(response: Promise<Response>): Promise<ArrayBuffer> {
      return response.then((r) => r.arrayBuffer());
   }

   private appendParameters(url: string, params?: { [p: string]: string }): string {
      if (params) {
         const keys = Object.keys(params);

         if (keys.length) {
            let query = "?";

            for (let i = 0; i < keys.length; i++) {
               if (i > 0) {
                  query += "&";
               }

               query += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(params[keys[i]]);
            }

            return url + query;
         }
      }

      return url;
   }
}
