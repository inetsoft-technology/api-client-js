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

import { createApiClient } from "../src/api-client";

declare const global: any;

describe("ApiClientImpl", () => {
   let adapter: any;

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
   });

   describe("when createApiClient() is called with credentials", () => {
      it("then authentication is performed", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {token: "secret"}}));
         adapter.get.mockReturnValueOnce(Promise.resolve({ data: { printers: [ "printer1", "printer2", "printer 3" ]}}));
         const client = createApiClient("http://localhost:8080/sree/", "admin", "admin", adapter);
         return client.printer.getPrinters().then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/login");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][2]).toMatchSnapshot();
         });
      });
   });

   describe("when createApiClient() is called without credentials", () => {
      it("then authentication is performed", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {token: "secret"}}));
         adapter.get.mockReturnValueOnce(Promise.resolve({ data: { printers: [ "printer1", "printer2", "printer 3" ]}}));
         const client = createApiClient("http://localhost:8080/sree/", null, null, adapter);
         return client.printer.getPrinters().then(() => {
            expect(adapter.get.mock.calls.length).toBe(2);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/login");
            expect(adapter.get.mock.calls[1][2]).toMatchSnapshot();
         });
      });
   });

   describe("when createApiClient() is called without the server URL", () => {
      it("then an error is thrown", () => {
         const url: any = undefined;
         expect(() => createApiClient(url, "admin", "admin", adapter)).toThrow();
      });
   });

   describe("when createApiClient() is called with a URL missing a trailing slash", () => {
      it("then a trailing slash is appended", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {token: "secret"}}));
         adapter.get.mockReturnValueOnce(Promise.resolve({ data: { printers: [ "printer1", "printer2", "printer 3" ]}}));
         const client = createApiClient("http://localhost:8080/sree", null, null, adapter);
         return client.printer.getPrinters().then(() => {
            expect(adapter.get.mock.calls.length).toBe(2);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/login");
         });
      });
   });

   describe("when the adapter is invoked multiple times", () => {
      it("then the cached token is used", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {token: "secret"}}));
         adapter.get.mockReturnValueOnce(Promise.resolve({ data: { printers: [ "printer1", "printer2", "printer 3" ]}}));
         adapter.get.mockReturnValueOnce(Promise.resolve({ data: { printers: [ "printer1", "printer2", "printer 3" ]}}));
         const client = createApiClient("http://localhost:8080/sree", null, null, adapter);
         return client.printer.getPrinters().then(() => client.printer.getPrinters()).then(() => {
            expect(adapter.get.mock.calls.length).toBe(3);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/login");
            expect(adapter.get.mock.calls[1][0]).toBe("http://localhost:8080/sree/api/public/printers");
            expect(adapter.get.mock.calls[1][2]).toMatchSnapshot();
            expect(adapter.get.mock.calls[2][0]).toBe("http://localhost:8080/sree/api/public/printers");
            expect(adapter.get.mock.calls[2][2]).toMatchSnapshot();
         });
      });
   });

   describe("when createApiClient() is called without an adapter", () => {
      it("then the fetch adapter is used by default", () => {
         global.fetch = jest.fn();
         global.fetch.mockReturnValueOnce(Promise.resolve({
            json: jest.fn(() => ({token: "secret"}))
         }));
         global.fetch.mockReturnValueOnce(Promise.resolve({
            json: jest.fn(() => ({printers: ["printer1", "printer2", "printer3"]}))
         }));
         const client = createApiClient("http://localhost:8080/sree/");
         return client.printer.getPrinters().then(result => {
            expect(result).toMatchSnapshot();
            expect(global.fetch.mock.calls.length).toBe(2);
         });
      });
   });
});
