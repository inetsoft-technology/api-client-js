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

import { ServerClient } from "../src/client/server/server-client";

describe("ServerClient", () => {
   let adapter: any;
   let client: ServerClient;

   const history = [
      {
         timestamp: "2019-07-26T09:00:00Z",
         host: "localhost",
         cpuUsage: 50.8,
         memoryUsage: 104857600,
         gcCount: 1,
         gcTime: 250,
         executingReports: 5,
         executingViewsheets: 4,
         executingQueries: 10
      },
      {
         timestamp: "2019-07-26T09:00:01Z",
         host: "localhost",
         cpuUsage: 25.2,
         memoryUsage: 104857610,
         gcCount: 1,
         gcTime: 200,
         executingReports: 1,
         executingViewsheets: 2,
         executingQueries: 4
      },
   ];

   beforeEach(() => {
      adapter = {
         get: jest.fn(),
         post: jest.fn(),
         put: jest.fn(),
         delete: jest.fn(),
         map: jest.fn(),
         mapText: jest.fn(),
         mapBinary: jest.fn()
      };
      client = new ServerClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getUsageHistory() is called", () => {
      it("the a list of server usage structures is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {history}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getUsageHistory().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/server/usage");
         });
      });
   });
});
