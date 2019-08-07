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

import { ScheduleClient } from "../src/client/schedule/schedule-client";

describe("ScheduleClient", () => {
   let adapter: any;
   let client: ScheduleClient;

   const conditions = [
      {
         conditionType: "time",
         date: null,
         dayOfWeek: -1,
         weekOfMonth: -1,
         weekOfYear: -1,
         hour: 12,
         minute: 0,
         second: 0,
         timeRange: null,
         type: "EVERY_DAY"
      },
      {
         conditionType: "completion",
         task: "anonymous:Task1"
      }
   ];

   const actions = [
      {
         actionType: "report",
         report: "folder/report1",
         locale: "en_US",
         printers: [ "Test Printer" ],
         pdf: "/tmp/test.pdf",
         csv: "/tmp/test/csv",
         emails: [ "joe@example.com", "sue@example.com" ],
         sender: "ann@example.com",
         notifies: [ "mark@example.com" ],
         format: "PDF",
         subject: "Test Email",
         message: "See the attached report.",
         htmlMessage: false,
         parameters: { param1: "value", param2: 1 }
      },
      {
         actionType: "viewsheet",
         bookmarkName: "My Bookmark",
         bookmarkUser: "admin",
         bookmarkType: "private",
         emails: [ "joe@example.com", "sue@example.com" ],
         sender: "ann@example.com",
         notifies: [ "mark@example.com" ],
         format: "POWERPOINT",
         subject: "Test Email",
         message: "<p>See the attached dashboard</p>",
         htmlMessage: true
      }
   ];

   const tasks = [
      {
         name: "anonymous:Task1",
         owner: "anonymous",
         enabled: true,
         status: {
            task: "anonymous:Task1",
            lastRunStatus: "success",
            nextRunStatus: "pending",
            lastRunStart: "2019-06-01 12:00:00Z",
            lastRunEnd: "2019-06-01 12:00:01Z",
            nextRunStart: "2019-06-02 12:00:00Z"
         }
      },
      {
         name: "admin:Task2",
         owner: "admin",
         enabled: true,
         status: {
            task: "admin:Task2",
            lastRunStatus: "failed",
            nextRunStatus: "pending",
            lastRunStart: "2019-06-01 13:00:00Z",
            lastRunEnd: "2019-06-01 13:00:01Z",
            nextRunStart: "2019-06-02 13:00:00Z",
            message: "The task failed due to a problem.",
            error: "[stack trace]"
         }
      }
   ];

   beforeEach(() => {
      adapter = {
         get: jest.fn(),
         post: jest.fn(),
         put: jest.fn(),
         delete: jest.fn(),
         map: jest.fn((promise: Promise<any>) => promise.then(response => response.data)),
         mapText: jest.fn(),
         mapBinary: jest.fn((promise: Promise<any>) => promise.then(response => response.data))
      };
      client = new ScheduleClient(adapter, () => Promise.resolve("secret"), "http://localhost:8080/sree/");
   });

   describe("when getScheduleTasks() is called", () => {
      it("then the list of tasks should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {tasks}}));
         return client.getScheduleTasks().then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule");
         });
      });
   });

   describe("when addScheduleTask() is called as enabled", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.addScheduleTask("anonymous:Task1", true, conditions, actions).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when addScheduleTask() is called as disabled", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.addScheduleTask("anonymous:Task1", false, conditions, actions).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getScheduleTask() is called", () => {
      it("then the task should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: tasks[0]}));
         return client.getScheduleTask("anonymous:Task1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1");
         });
      });
   });

   describe("when updateScheduleTask() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.updateScheduleTask("anonymous:Task1", tasks[0]).then(() => {
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when removeScheduleTask() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.removeScheduleTask("anonymous:Task1").then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1");
         });
      });
   });

   describe("when getTaskConditions() is called", () => {
      it("then the list of conditions should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {conditions}}));
         return client.getTaskConditions("anonymous:Task1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/conditions");
         });
      });
   });

   describe("when addTaskCondition() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.addTaskCondition("anonymous:Task1", conditions[0]).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/conditions");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getTaskCondition() is called", () => {
      it("then the condition should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: conditions[0]}));
         return client.getTaskCondition("anonymous:Task1", 0).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/conditions/0");
         });
      });
   });

   describe("when updateTaskCondition() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.updateTaskCondition("anonymous:Task1", 0, conditions[0]).then(() => {
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/conditions/0");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when removeTaskCondition() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.removeTaskCondition("anonymous:Task1", 0).then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/conditions/0");
         });
      });
   });

   describe("when getTaskActions() is called", () => {
      it("then the list of actions should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: {actions}}));
         return client.getTaskActions("anonymous:Task1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/actions");
         });
      });
   });

   describe("when addTaskAction() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.addTaskAction("anonymous:Task1", actions[0]).then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/actions");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when getTaskAction() is called", () => {
      it("then the action should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: actions[0]}));
         return client.getTaskAction("anonymous:Task1", 0).then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/actions/0");
         });
      });
   });

   describe("when updateTaskAction() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.put.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.updateTaskAction("anonymous:Task1", 0, actions[0]).then(() => {
            expect(adapter.put.mock.calls.length).toBe(1);
            expect(adapter.put.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/actions/0");
            expect(adapter.put.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });

   describe("when removeTaskAction() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.delete.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.removeTaskAction("anonymous:Task1", 0).then(() => {
            expect(adapter.delete.mock.calls.length).toBe(1);
            expect(adapter.delete.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/actions/0");
         });
      });
   });

   describe("when getTaskStatus() is called", () => {
      it("then the status should be returned", () => {
         adapter.get.mockReturnValueOnce(Promise.resolve({data: tasks[0].status}));
         return client.getTaskStatus("anonymous:Task1").then(result => {
            expect(result).toMatchSnapshot();
            expect(adapter.get.mock.calls.length).toBe(1);
            expect(adapter.get.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/status");
         });
      });
   });

   describe("when runTask() is called", () => {
      it("then the adapter should be called with the correct arguments", () => {
         adapter.post.mockReturnValueOnce(Promise.resolve({data: {}}));
         return client.runTask("anonymous:Task1").then(() => {
            expect(adapter.post.mock.calls.length).toBe(1);
            expect(adapter.post.mock.calls[0][0]).toBe("http://localhost:8080/sree/api/public/schedule/anonymous:Task1/run");
            expect(adapter.post.mock.calls[0][1]).toMatchSnapshot();
         });
      });
   });
});
