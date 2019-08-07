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

import { ViewsheetClient } from "../src/client/sheet/viewsheet/viewsheet-client";

describe("ViewsheetClient", () => {
   let adapter: any;
   let client: ViewsheetClient;

   const sheets = [
      {
         asset: "1^128^__NULL__^Examples/Census",
         path: "Examples/Census",
         label: "Census",
         global: true
      },
      {
         asset: "1^128^__NULL__^Examples/Hurricanes",
         path: "Examples/Hurricanes",
         label: "Hurricanes",
         global: true
      },
      {
         asset: "1^128^__NULL__^Examples/Sales Summary",
         path: "Examples/Sales Summary",
         label: "Sales Summary",
         global: true
      }
   ];

   const openSheets = [
      {
         asset: "1^128^__NULL__^Examples/Census",
         path: "Examples/Census",
         label: "Census",
         global: true,
         identifier: "id1"
      },
      {
         asset: "1^128^__NULL__^Examples/Hurricanes",
         path: "Examples/Hurricanes",
         label: "Hurricanes",
         global: true,
         identifier: "id2"
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
      client = new ViewsheetClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getViewsheets() is called", () => {
      it("then a list of sheets is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {sheets}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getViewsheets().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets");
         });
      });
   });

   describe("when getOpenedViewsheets() is called", () => {
      it("then a list of sheets is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {sheets: openSheets}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenedViewsheets().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open");
         });
      });
   });

   describe("when openViewsheet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: openSheets[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.openViewsheet("1^128^__NULL__^Census", {p1: "v1", p2: "v2"}).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getOpenedViewsheet() is called", () => {
      it("then the opened viewsheet is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: openSheets[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenedViewsheet("id1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open/id1");
         });
      });
   });

   describe("when closeViewsheet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.closeViewsheet("id1").then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open/id1");
         });
      });
   });

   describe("when mailViewsheet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.mailViewsheet("id1", "PDF", ["joe@example.com", "sue@example.com"], "ann@example.com", "Test Mail", "This is a test email.").then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open/id1/mail");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when exportViewsheet() is called", () => {
      it("then the exported viewsheet file is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: createBinaryData()}));
         adapter.mapBinary.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.exportViewsheet("id1", "PDF").then(result => {
            validateBinaryData(result);
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/viewsheets/open/id1/export/PDF");
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
