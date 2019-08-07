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

import { DatabaseClient } from "../src/client/database/database-client";

describe("DatabaseClient", () => {
   let adapter: any;
   let client: DatabaseClient;

   const database = {
      type: "MYSQL",
      driver: "com.mysql.jdbc.Driver",
      url: "jdbc:mysql://localhost:3306/inetsoft",
      isolationLevel: "READ COMMITTED",
      requireLogin: true,
      userName: "root",
      password: "password",
      status: "connected"
   };

   beforeEach(() => {
      adapter = {
         get: jest.fn(),
         post: jest.fn(),
         put: jest.fn(),
         delete: jest.fn(),
         map: jest.fn((promise: Promise<any>) => promise.then(response => response.data)),
         mapText: jest.fn(),
         mapBinary: jest.fn()
      };
      client = new DatabaseClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getDatabase() is called", () => {
      it("then the database properties are returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: database}));
         return client.getDatabase().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/database");
         });
      });
   });

   describe("when setDatabase() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({data: database}));
         return client.setDatabase(database).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/database");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when installSchema() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.installSchema().then(() => {
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/database/schema");
         });
      });
   });

   describe("when uninstallSchema() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.uninstallSchema().then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/database/schema");
         });
      });
   });
});
