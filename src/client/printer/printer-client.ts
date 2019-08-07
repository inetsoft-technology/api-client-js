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
import { PrinterApi } from "./printer-api";

/**
 * @hidden
 */
export class PrinterClient extends AbstractClient implements PrinterApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getPrinters(): Promise<string[]> {
      const url = "api/public/printers";
      return this.doGet(url).then((list: any) => list.printers);
   }
}
