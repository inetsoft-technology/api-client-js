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

import { WorksheetClient } from "../src/client/sheet/worksheet/worksheet-client";

describe("WorksheetClient", () => {
   let adapter: any;
   let client: WorksheetClient;

   const sheets = [
      {
         asset: "1^2^__NULL__^Examples/Census Data",
         path: "Examples/Census Data",
         label: "Census Data",
         global: true
      },
      {
         asset: "1^2^__NULL__^Examples/Hurricane",
         path: "Examples/Hurricane",
         label: "Hurricane",
         global: true
      },
      {
         asset: "1^2^__NULL__^Examples/Sales Revenue",
         path: "Examples/Sales Revenue",
         label: "Sales Revenue",
         global: true
      },
      {
         asset: "1^2^__NULL__^Examples/Call Center Monitoring",
         path: "Examples/Call Center Monitoring",
         label: "Call Center Monitoring",
         global: true
      }
   ];
   const openSheets = [
      {
         asset: "1^2^__NULL__^Examples/Call Center Monitoring",
         path: "Examples/Call Center Monitoring",
         label: "Call Center Monitoring",
         global: true,
         identifier: "id1"
      },
      {
         asset: "1^2^__NULL__^Examples/Hurricane",
         path: "Examples/Hurricane",
         label: "Hurricane",
         global: true,
         identifier: "id2"
      }
   ];
   const parameters = [
      {
         name: "startCounter",
         type: "integer"
      }
   ];
   const metadata = {
      rowCount: 2,
      colCount: 24,
      headerRowCount: 1,
      headerColCount: 0,
      trailerRowCount: 0,
      trailerColCount: 0,
      colIdentifiers: ["Annual Trends.Year", "Regions.Code", "Regions.Region", "RawData.State", "RawData.RegionCode", "RawData.DivisionCode", "RawData.Land Area", "RawData.Degree Pct", "RawData.Home Owner Rate", "RawData.Travel Time", "RawData.Housing units", "RawData.Households", "RawData.Poverty Rate", "Divisions.Code", "Divisions.Division", "RawData.Population0", "RawData.Median Income0", "RawData.Property Value0", "Annual Trends.Decr1", "Annual Trends.Incr1", null, null, "RawData.Federal spending", null],
      colTypes: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      rows: [{values: ["Year", "Code", "Region", "State", "RegionCode", "DivisionCode", "Land Area", "Degree Pct", "Home Owner Rate", "Travel Time", "Housing units", "Households", "Poverty Rate", "Code_1", "Division", "Population0", "Median Income0", "Property Value0", "Decr1", "Incr1", "Population", "Median Income", "Federal spending", "Property Value"]}, {values: [999.99, 999, "XXXXXX", "XXXXX", 999, 999, 999, 999.99, 999.99, 999.99, 999, 999, 999.99, 999, "XXXXXXXX", 999, 999, 999, "XXXXX", 999.99, 999, 999.99, 999, 999.99]}]
   };
   const data = {
      rowCount: 10,
      colCount: 8,
      headerRowCount: 1,
      headerColCount: 0,
      trailerRowCount: 0,
      trailerColCount: 0,
      colIdentifiers: ["name", "type", "year", "day", "datetime", "latitude", "longitude", "wind"],
      colTypes: [null, null, null, null, null, null, null, null],
      rows: [
         {values: ["name", "type", "year", "day", "datetime", "latitude", "longitude", "wind"]},
         {values: ["ANDREW-1986", "NAMED", 1986, 605, 1.9860605E11, 26.2, -75.8, 30]},
         {values: ["ANDREW-1986", "NAMED", 1986, 605, 1.986060506E11, 27.4, -76.0, 30]},
         {values: ["ANDREW-1986", "NAMED", 1986, 605, 1.986060512E11, 28.4, -76.4, 30]},
         {values: ["ANDREW-1986", "NAMED", 1986, 605, 1.986060518E11, 29.1, -77.0, 30]},
         {values: ["ANDREW-1986", "NAMED", 1986, 606, 1.9860606E11, 29.7, -77.5, 35]},
         {values: ["ANDREW-1986", "NAMED", 1986, 606, 1.986060606E11, 30.2, -77.8, 40]},
         {values: ["ANDREW-1986", "NAMED", 1986, 606, 1.9860606120000003E11, 30.7, -78.0, 45]},
         {values: ["ANDREW-1986", "NAMED", 1986, 606, 1.9860606180000003E11, 31.4, -77.9, 45]},
         {values: ["ANDREW-1986", "NAMED", 1986, 607, 1.9860607E11, 31.9, -77.8, 45]}
      ]
   };

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
      client = new WorksheetClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getWorksheets() is called", () => {
      it("then a list of sheets is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {sheets}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getWorksheets().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets");
         });
      });
   });

   describe("when getWorksheetParameters() is called", () => {
      it("then a list of parameters is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {parameters}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getWorksheetParameters("1^2^__NULL__^Examples/Call Center Monitoring").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/parameters/MV4yXl9fTlVMTF9fXkV4YW1wbGVzL0NhbGwgQ2VudGVyIE1vbml0b3Jpbmc=");
         });
      });
   });

   describe("when getWorksheetMetadata() is called", () => {
      it("then a table containing the column metadata is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: metadata}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getWorksheetMetadata("1^2^__NULL__^Examples/Census Data").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/metadata/MV4yXl9fTlVMTF9fXkV4YW1wbGVzL0NlbnN1cyBEYXRh");
         });
      });
   });

   describe("when getOpenedWorksheets() is called", () => {
      it("then a list of sheets is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {sheets: openSheets}}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenedWorksheets().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/open");
         });
      });
   });

   describe("when openWorksheet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: openSheets[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.openWorksheet("1^2^__NULL__^Call Center Monitoring", {p1: "v1", p2: "v2"}).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/open");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getOpenedWorksheet() is called", () => {
      it("then the opened worksheet is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: openSheets[0]}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getOpenedWorksheet("id1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/open/id1");
         });
      });
   });

   describe("when closeWorksheet() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.closeWorksheet("id1").then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/open/id1");
         });
      });
   });

   describe("when getWorksheetData() is called", () => {
      it("then the adapter is called with the correct arguments and the data is returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data}));
         adapter.map.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.getWorksheetData("id2", 0, 10).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/worksheets/open/id2/data");
            expect(adapter.get.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });
});
