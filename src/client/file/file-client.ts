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
import { FileApi } from "./file-api";

/**
 * @hidden
 */
export class FileClient extends AbstractClient implements FileApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public convertLibrary(extract: boolean): Promise<void> {
      const data = { extract };
      const url = "api/public/files/convert-library";
      return this.doPost(url, data);
   }

   public convertStorage(extract: boolean, overwrite: boolean): Promise<void> {
      const data = { extract, overwrite };
      const url = "api/public/files/convert-storage";
      return this.doPost(url, data);
   }

   public importAssets(data: ArrayBuffer, excluded: string[], overwrite: boolean): Promise<void> {
      const encoded = fromByteArray(new Uint8Array(data));
      const body = { excluded, overwrite, data: encoded };
      const url = "api/public/files/import-assets";
      return this.doPost(url, body);
   }

   public exportAssets(name: string, includes: string[], excludes: string[]): Promise<ArrayBuffer> {
      const body = { name, includes, excludes };
      const url = "api/public/files/export-assets";
      return this.doPostBinary(url, body);
   }

   public copyDataSpace(download: boolean, overwrite: boolean): Promise<void> {
      const data = { download, overwrite };
      const url = "api/public/files/copy-data-space";
      return this.doPost(url, data);
   }
}
