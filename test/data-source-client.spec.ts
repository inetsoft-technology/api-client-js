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

import { DataSourceClient } from "../src/client/datasource/data-source-client";

describe("DataSourceClient", () => {
   let adapter: any;
   let client: DataSourceClient;

   const dataSources = [
      {
         id: "ds1",
         name: "Data source 1",
         type: "jdbc",
         url: "jdbc:test:ds1",
         driver: "com.example.Driver",
         requireLogin: true,
         user: "sa",
         password: "secret",
         defaultDatabase: "PUBLIC"
      },
      {
         id: "ds2",
         name: "Data source 2",
         type: "text",
         url: "http://localhost/data/example.csv",
         method: "get"
      }
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
      client = new DataSourceClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getDataSources() is called", () => {
      it("then a list of data sources is returned", () => {
         const list = { dataSources };

         adapter.get.mockImplementation(() => Promise.resolve(list));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.getDataSources().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
         });
      });
   });

   describe("when getDataSource() is called with a valid name", () => {
      it("then a data source is returned", () => {
         const list = { dataSources: [dataSources[0]] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.getDataSource("Data source 1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
            expect(adapter.get.mock.calls[0][1].name).toBe("Data source 1");
         });
      });
   });

   describe("when getDataSource() is called with an invalid name", () => {
      it("then null is returned", () => {
         const list = { dataSources: [] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.getDataSource("Missing data source").then(result => {
            expect(result).toBeNull();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
            expect(adapter.get.mock.calls[0][1].name).toBe("Missing data source");
         });
      });
   });

   describe("when updateDataSource() is called with a valid name and is successful", () => {
      it("then the promise is resolved", () => {
         const list = { dataSources: [dataSources[0]] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.put.mockReturnValueOnce(Promise.resolve());
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.updateDataSource("Data source 1", dataSources[1]).then(() => {
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
            expect(adapter.get.mock.calls[0][1].name).toBe("Data source 1");
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources/ds1");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when updateDataSource() is called with a valid name and fails", () => {
      it("then the promise is rejected", () => {
         const list = { dataSources: [dataSources[0]] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.put.mockReturnValueOnce(Promise.reject("Test failure"));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         expect.assertions(1);
         return expect(client.updateDataSource("Data source 1", dataSources[1])).rejects.toEqual("Test failure");
      });
   });

   describe("when updateDataSource() is called with an invalid name", () => {
      it("then the promise is rejected", () => {
         const list = { dataSources: [] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         expect.assertions(1);
         return expect(client.updateDataSource("Missing data source", dataSources[1])).rejects.toEqual("Data source not found: 'Missing data source'");
      });
   });

   describe("when deleteDataSource() is called with a valid name and succeeds", () => {
      it("then the promise is resolved", () => {
         const list = { dataSources: [dataSources[0]] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.delete.mockReturnValueOnce(Promise.resolve());
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.deleteDataSource("Data source 1").then(() => {
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
            expect(adapter.get.mock.calls[0][1].name).toBe("Data source 1");
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources/ds1");
         });
      });
   });

   describe("when deleteDataSource() is called with a valid name, the force parameter, and succeeds", () => {
      it("then the promise is resolved", () => {
         const list = { dataSources: [dataSources[0]] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.delete.mockReturnValueOnce(Promise.resolve());
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.deleteDataSource("Data source 1", true).then(() => {
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources");
            expect(adapter.get.mock.calls[0][1].name).toBe("Data source 1");
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/dataSources/ds1");
            expect(adapter.delete.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when deleteDataSource() is called with a valid name and fails", () => {
      it("then the promise is rejected", () => {
         const list = {dataSources: [dataSources[0]]};
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.delete.mockReturnValueOnce(Promise.reject("Test failure"));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         expect.assertions(1);
         return expect(client.deleteDataSource("Data source 1")).rejects.toEqual("Test failure");
      });
   });

   describe("when deleteDataSource() is called with an invalid name", () => {
      it("then the promise is rejected", () => {
         const list = { dataSources: [] };
         adapter.get.mockReturnValueOnce(Promise.resolve(list));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         expect.assertions(1);
         return expect(client.deleteDataSource("Missing data source")).rejects.toEqual("Data source not found: 'Missing data source'");
      });
   });
});
