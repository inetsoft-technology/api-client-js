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

import { AbstractClient } from "../src/client/abstract-client";
import { HttpAdapter } from "../src/api-client";

class TestClient extends AbstractClient {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   get<T>(url: string, params?: { [p: string]: string }): Promise<T> {
      return this.doGet(url, params);
   }

   getBinary(url: string, params?: { [p: string]: string }): Promise<ArrayBuffer> {
      return this.doGetBinary(url, params);
   }

   post<T>(url: string, data?: any, params?: { [p: string]: string }): Promise<T> {
      return this.doPost(url, data, params);
   }

   postBinary(url: string, data?: any, params?: { [p: string]: string }): Promise<ArrayBuffer> {
      return this.doPostBinary(url, data, params);
   }

   put<T>(url: string, data?: any, params?: { [p: string]: string }): Promise<T> {
      return this.doPut(url, data, params);
   }

   delete<T>(url: string, params?: { [p: string]: string }): Promise<T> {
      return this.doDelete(url, params);
   }
}

describe("AbstractClient", () => {
   let adapter: any;
   let client: TestClient;

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
      client = new TestClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when doGet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({result: "value"}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => ({mapped: response})));

         return client.get("test", { p1: "v1", p2: "v2" }).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.get.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.get.mock.calls[0][2]).toMatchSnapshot();
         });
      });
   });

   describe("when doGetBinary() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({result: createBinaryData()}));
         adapter.mapBinary.mockImplementation((promise: Promise<any>) => promise.then(response => response.result));

         return client.getBinary("test", {p1: "v1", p2: "v2"}).then(result => {
            validateBinaryData(result);
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.get.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.get.mock.calls[0][2]).toMatchSnapshot();
         });
      });
   });

   describe("when doPost() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({result: "value" }));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => ({mapped: response})));

         return client.post("test", { query: "value" }, { p1: "v1", p2: "v2" }).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][2]).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][3]).toMatchSnapshot();
         });
      });
   });

   describe("when doPostBinary() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({result: createBinaryData()}));
         adapter.mapBinary.mockImplementation((promise: Promise<any>) => promise.then(response => response.result));

         return client.postBinary("test", { query: "value" }, {p1: "v1", p2: "v2"}).then(result => {
            validateBinaryData(result);
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][2]).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][3]).toMatchSnapshot();
         });
      });
   });

   describe("when doPut() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({result: "value" }));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => ({mapped: response})));

         return client.put("test", { query: "value" }, { p1: "v1", p2: "v2" }).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.put.mock.calls[0][2]).toMatchSnapshot();
            expect(adapter.put.mock.calls[0][3]).toMatchSnapshot();
         });
      });
   });

   describe("when doDelete() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({result: "value"}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => ({mapped: response})));

         return client.delete("test", { p1: "v1", p2: "v2" }).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(adapter.delete.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.delete.mock.calls[0][2]).toMatchSnapshot();
         });
      });
   });
});

function createBinaryData(): ArrayBuffer {
   const buffer = new ArrayBuffer(16);
   const array = new Int32Array(buffer);
   array[0] = 1;
   array[1] = 2;
   array[2] = 3;
   array[3] = 4;
   return buffer;
}

function validateBinaryData(buffer: ArrayBuffer): void {
   expect(buffer).toBeTruthy();
   expect(buffer.byteLength).toBe(16);
   const actual = new Int32Array(buffer);
   expect(actual[0]).toBe(1);
   expect(actual[1]).toBe(2);
   expect(actual[2]).toBe(3);
   expect(actual[3]).toBe(4);
}
