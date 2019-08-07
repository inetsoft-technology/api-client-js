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

import { FetchAdapter } from "../src/client/fetch-adapter";

declare const global: any;

describe("FetchAdapter", () => {
   let adapter: FetchAdapter;

   beforeEach(() => {
      global.fetch = jest.fn();
      adapter = new FetchAdapter();
   });

   describe("when get() is called", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.get("http://localhost:8080/sree/test", {p1: "v1", p2: "v2"}, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test?p1=v1&p2=v2");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when get() is called with no parameters", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.get("http://localhost:8080/sree/test", undefined, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when get() is called with empty parameters", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.get("http://localhost:8080/sree/test", {}, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when post() is called", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.post("http://localhost:8080/sree/test", {query: "value"}, {p1: "v1", p2: "v2"}, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test?p1=v1&p2=v2");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when put() is called", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.put("http://localhost:8080/sree/test", {query: "value"}, {p1: "v1", p2: "v2"}, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test?p1=v1&p2=v2");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when delete() is called", () => {
      it("fetch is called with the correct arguments", () => {
         global.fetch.mockReturnValueOnce(Promise.resolve({status: 200}));
         return adapter.delete("http://localhost:8080/sree/test", {p1: "v1", p2: "v2"}, {"X-Inetsoft-Token": "secret"}).then(response => {
            expect(response).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(1);
            expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:8080/sree/test?p1=v1&p2=v2");
            expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when map() is called", () => {
      it("the promise is resolved to the response JSON body", () => {
         const response: any = {
            json: jest.fn(() => ({result: "value"}))
         };
         return adapter.map(Promise.resolve(response)).then(result => {
            expect(result).toMatchSnapshot();
            expect(response.json.mock.calls.length).toBe(1);
         });
      });
   });

   describe("when mapText() is called", () => {
      it("the promise is resolved to the response text body", () => {
         const response: any = {
            text: jest.fn(() => "value")
         };
         return adapter.mapText(Promise.resolve(response)).then(result => {
            expect(result).toEqual("value");
            expect(response.text.mock.calls.length).toBe(1);
         });
      });
   });

   describe("when mapBinary() is called", () => {
      it("the promise is resolved to the response binary body", () => {
         const response: any = {
            arrayBuffer: jest.fn(() => createBinaryData())
         };
         return adapter.mapBinary(Promise.resolve(response)).then(result => {
            validateBinaryData(result);
            expect(response.arrayBuffer.mock.calls.length).toBe(1);
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
