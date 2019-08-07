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

import { AbstractClient } from "../abstract-client";
import { HttpAdapter } from "../http-adapter";
import {
   ScheduleAction,
   ScheduleApi,
   ScheduleCondition,
   ScheduleTask,
   ScheduleTaskStatus
} from "./schedule-api";

/**
 * @hidden
 */
export class ScheduleClient extends AbstractClient implements ScheduleApi {

   constructor(adapter: HttpAdapter<any>, token: () => Promise<string>, baseUrl: string) {
      super(adapter, token, baseUrl);
   }

   public getScheduleTasks(): Promise<ScheduleTask[]> {
      const url = "api/public/schedule";
      return this.doGet<any>(url).then((list) => list.tasks);
   }

   public addScheduleTask(name: string, enabled: boolean, conditions: ScheduleCondition[],
                          actions: ScheduleAction[]): Promise<void>
   {
      const request = { name, enabled, conditions, actions };
      const url = "api/public/schedule";
      return this.doPost(url, request);
   }

   public getScheduleTask(name: string): Promise<ScheduleTask> {
      const url = `api/public/schedule/${name}`;
      return this.doGet(url);
   }

   public updateScheduleTask(name: string, task: ScheduleTask): Promise<void> {
      const url = `api/public/schedule/${name}`;
      return this.doPut(url, task);
   }

   public removeScheduleTask(name: string): Promise<void> {
      const url = `api/public/schedule/${name}`;
      return this.doDelete(url);
   }

   public getTaskConditions(name: string): Promise<ScheduleCondition[]> {
      const url = `api/public/schedule/${name}/conditions`;
      return this.doGet<any>(url).then((list) => list.conditions);
   }

   public addTaskCondition(name: string, condition: ScheduleCondition): Promise<void> {
      const url = `api/public/schedule/${name}/conditions`;
      return this.doPost(url, condition);
   }

   public getTaskCondition(name: string, index: number): Promise<ScheduleCondition> {
      const url = `api/public/schedule/${name}/conditions/${index}`;
      return this.doGet(url);
   }

   public updateTaskCondition(name: string, index: number,
                              condition: ScheduleCondition): Promise<void>
   {
      const url = `api/public/schedule/${name}/conditions/${index}`;
      return this.doPut(url, condition);
   }

   public removeTaskCondition(name: string, index: number): Promise<void> {
      const url = `api/public/schedule/${name}/conditions/${index}`;
      return this.doDelete(url);
   }

   public getTaskActions(name: string): Promise<ScheduleAction[]> {
      const url = `api/public/schedule/${name}/actions`;
      return this.doGet<any>(url).then((list) => list.actions);
   }

   public addTaskAction(name: string, action: ScheduleAction): Promise<void> {
      const url = `api/public/schedule/${name}/actions`;
      return this.doPost(url, action);
   }

   public getTaskAction(name: string, index: number): Promise<ScheduleAction> {
      const url = `api/public/schedule/${name}/actions/${index}`;
      return this.doGet(url);
   }

   public updateTaskAction(name: string, index: number, action: ScheduleAction): Promise<void> {
      const url = `api/public/schedule/${name}/actions/${index}`;
      return this.doPut(url, action);
   }

   public removeTaskAction(name: string, index: number): Promise<void> {
      const url = `api/public/schedule/${name}/actions/${index}`;
      return this.doDelete(url);
   }

   public getTaskStatus(name: string): Promise<ScheduleTaskStatus> {
      const url = `api/public/schedule/${name}/status`;
      return this.doGet(url);
   }

   public runTask(name: string): Promise<void> {
      const request = { name };
      const url = `api/public/schedule/${name}/run`;
      return this.doPost(url, request);
   }
}
