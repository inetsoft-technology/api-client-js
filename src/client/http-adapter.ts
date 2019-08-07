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
 * Interface for classes that provide an adapter to an HTTP client implementation.
 */
export interface HttpAdapter<R> {
   /**
    * Executes an HTTP GET request.
    *
    * @param url     the URL.
    * @param params  the request query parameters, if any.
    * @param headers the HTTP request headers, if any.
    *
    * @return the HTTP response body.
    */
   get(url: string, params?: {[name: string]: string},
       headers?: {[name: string]: string}): Promise<R>;

   /**
    * Executes an HTTP POST request.
    *
    * @param url     the URL.
    * @param body    the HTTP request body.
    * @param params  the request query parameters, if any.
    * @param headers the HTTP request headers, if any.
    *
    * @return the HTTP response body.
    */
   post(url: string, body?: any, params?: {[name: string]: string},
        headers?: {[name: string]: string}): Promise<R>;

   /**
    * Executes an HTTP PUT request.
    *
    * @param url     the URL.
    * @param body    the HTTP request body.
    * @param params  the request query parameters, if any.
    * @param headers the HTTP request headers, if any.
    *
    * @return the HTTP response body.
    */
   put(url: string, body?: any, params?: {[name: string]: string},
       headers?: {[name: string]: string}): Promise<R>;

   /**
    * Executes an HTTP GET request.
    *
    * @param url     the URL.
    * @param headers the HTTP req
    * @param params  the request query parameters, if any.uest headers, if any.
    *
    * @return the HTTP response body.
    */
   delete(url: string, params?: {[name: string]: string},
          headers?: {[name: string]: string}): Promise<R>;

   /**
    * Maps an HTTP response body onto a JSON type.
    *
    * @param response the HTTP response object.
    *
    * @return the HTTP response body.
    */
   map<T>(response: Promise<R>): Promise<T>;

   /**
    * Maps an HTTP response body onto plain text.
    *
    * @param response the HTTP response object.
    *
    * @return the HTTP response body.
    */
   mapText(response: Promise<R>): Promise<string>;

   /**
    * Maps an HTTP response body onto raw, binary data.
    *
    * @param response the HTTP response object.
    *
    * @return the HTTP response body.
    */
   mapBinary(response: Promise<R>): Promise<ArrayBuffer>;
}
