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

import { ReportClient } from "../src/client/report/report-client";

describe("ReportClient", () => {
   let adapter: any;
   let client: ReportClient;

   const reports = [
      {
         path: "folder/report1",
         label: "Folder/Report 1"
      },
      {
         path: "folder/report2",
         label: "Folder/Report 2"
      },
      {
         path: "folder/report3",
         label: "Folder/Report 3"
      }
   ];

   const openReports = [
      {
         path: "folder/report1",
         label: "Folder/Report 1",
         identifier: "id1"
      },
      {
         path: "folder/report2",
         label: "Folder/Report 2",
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
      client = new ReportClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getReports() is called", () => {
      it("then a list of reports is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {reports}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getReports().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports");
         });
      });
   });

   describe("when getOpenReports() is called", () => {
      it("then a list of reports is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {reports: openReports}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenReports().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open");
         });
      });
   });

   describe("when openReport() is called and execute is true", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: openReports[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.openReport("folder/report1", true, {p1: "v1", p2: 1}).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when openReport() is called and execute is false", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: openReports[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.openReport("folder/report1", false, {p1: "v1", p2: 1}).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getOpenedReport() is called", () => {
      it("then the opened report is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: openReports[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenedReport("id1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1");
         });
      });
   });

   describe("when executeReport() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.executeReport("id1", {p1: "v1", p2: 1}).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1/execute");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when closeReport() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.closeReport("id1").then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1");
         });
      });
   });

   describe("when getReportPageCount() is called", () => {
      it("then the number of pages is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {pages: 5}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getReportPageCount("id1").then(result => {
            expect(result).toBe(5);
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1/pages");
         });
      });
   });

   describe("when mailReport() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.mailReport("id1", ["joe@example.com", "sue@example.com"], "ann@example.com", "Test Mail", "This is a test email.", "PDF").then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1/mail");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when printReport() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.printReport("id1", "Test Printer", [1, 2, 3, 4]).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1/print");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when exportReport() is called", () => {
      it("then the exported report file is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: createBinaryData()}));
         adapter.mapBinary.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.exportReport("id1", "PDF").then(result => {
            validateBinaryData(result);
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/open/id1/export/PDF");
         });
      });
   });

   describe("when deployReport() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         const parameters = [{
            type: "CREATE",
            dataType: "string",
            name: "param1",
            value: "value1"
         }];
         const permissions = [{
            name: "admin",
            type: "USER",
            actions: ["READ", "WRITE", "DELETE", "ADMIN"]
         }];

         return client.deployReport(createBinaryData(), "report4", "Report 4", "A test report", "folder2", true, false, false, null, true, ["PDF", "EXCEL"], parameters, permissions).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/reports/deploy");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
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
