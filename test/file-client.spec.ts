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

import { FileClient } from "../src/client/file/file-client";

describe("FileClient", () => {
   let adapter: any;
   let client: FileClient;

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
      client = new FileClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when convertLibrary() is called with extract set to true", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertLibrary(true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-library");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when convertLibrary() is called with extract set to false", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertLibrary(false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-library");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when convertStorage(true, true) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertStorage(true, true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-storage");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when convertStorage(true, false) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertStorage(true, false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-storage");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when convertStorage(false, true) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertStorage(false, true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-storage");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when convertStorage(false, false) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.convertStorage(false, false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/convert-storage");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when importAssets() is called with overwrite set to true", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.importAssets(createBinaryData(), ["a1", "a2"], true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/import-assets");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when importAssets() is called with overwrite set to false", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);
         return client.importAssets(createBinaryData(), ["a1", "a2"], false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/import-assets");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when exportAssets() is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({ data: createBinaryData() }));
         adapter.mapBinary.mockImplementation((promise: Promise<any>) => promise.then(response => response.data));
         return client.exportAssets("assets", ["i1", "i2"], ["e1", "e2"]).then(result => {
            validateBinaryData(result);
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/export-assets");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when copyDataSpace(true, true) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.copyDataSpace(true, true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/copy-data-space");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when copyDataSpace(true, false) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.copyDataSpace(true, false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/copy-data-space");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when copyDataSpace(false, true) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.copyDataSpace(false, true).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/copy-data-space");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when copyDataSpace(false, false) is called", () => {
      it("then the adapter is called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({}));
         adapter.map.mockImplementation((response: Promise<any>) => response);

         return client.copyDataSpace(false, false).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/files/copy-data-space");
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
