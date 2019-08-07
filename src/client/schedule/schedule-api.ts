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

/**
 * ScheduleTaskStatus describes the current status of a schedule task.
 */
export interface ScheduleTaskStatus {
   /**
    * The name of the schedule task.
    */
   task: string;

   /**
    * The status of the last run of the task.
    */
   lastRunStatus?: string;

   /**
    * The status of the next run of the task.
    */
   nextRunStatus?: string;

   /**
    * The ISO 8601-formatted date and time at which the last run started.
    */
   lastRunStart?: string;

   /**
    * The ISO 8601-formatted date and time at which the last run ended.
    */
   lastRunEnd?: string;

   /**
    * The ISO 8601-formatted date and time at which the next run is scheduled.
    */
   nextRunStart?: string;

   /**
    * The error message from the last run, if any.
    */
   message?: string;

   /**
    * The error that occurred during the last run, if any.
    */
   error?: string;
}

/**
 * ScheduleTask contains the properties of a scheduled task.
 */
export interface ScheduleTask {
   /**
    * The name of the task.
    */
   name: string;

   /**
    * The name of the user that owns the task.
    */
   owner: string;

   /**
    * A flag indicating if the task is enabled or disabled.
    */
   enabled: boolean;

   /**
    * The current status of the task.
    */
   status?: ScheduleTaskStatus;
}

/**
 * ScheduleCondition defines the conditions at which a schedule task runs.
 */
export interface ScheduleCondition {
   /**
    * The type of condition. The allowable values are 'completion', and 'time'.
    */
   conditionType: string;
}

/**
 * CompletionCondition describes a condition that is satisfied when another schedule task finishes.
 * CompletionCondition has a value of 'completion' for the conditionType property.
 */
export interface CompletionCondition extends ScheduleCondition {
   /**
    * The name of the task on which the condition depends.
    */
   task: string;
}

/**
 * TimeCondition describes a condition that is satisfied by some time-based criteria. TimeCondition
 * has a value of 'time' for the conditionType property.
 */
export interface TimeCondition extends ScheduleCondition {
   /**
    * The ISO 8601-formatted date and time at which the condition is satisfied.
    */
   date: string | null;

   /**
    * The day of week (0-6) on which the condition is satisfied.
    */
   dayOfWeek: number;

   /**
    * The week of the month (0-4) in which the condition is satisfied.
    */
   weekOfMonth: number;

   /**
    * The week of the year (0-52) in which the condition is satisfied.
    */
   weekOfYear: number;

   /**
    * The hour of the day (0-23) at which the condition is satisfied.
    */
   hour: number;

   /**
    * The minute of the hour (0-59) at which the condition is satisfied.
    */
   minute: number;

   /**
    * The second (0-59) at which the condition is satisfied.
    */
   second: number;

   /**
    * The name of the time range in which the condition is satisfied.
    */
   timeRange: string | null;

   /**
    * The type of time condition to apply. The value of this property determines which fields are
    * valid. The allowable values are  'AT', 'DAY_OF_MONTH', 'DAY_OF_WEEK', 'EVERY_DAY',
    * 'WEEK_OF_MONTH', and 'WEEK_OF_YEAR'.
    */
   type: string;
}

/**
 * ScheduleAction defines the actions to be performed when a schedule task uns.
 */
export interface ScheduleAction {
   /**
    * The type of action. The allowable values are 'report' and 'viewsheet'.
    */
   actionType: string;
}

/**
 * ReportAction describes an action that opens a report and performs one or more sub-actions on it.
 * ReportAction has the value of 'report' for the actionType property.
 */
export interface ReportAction {
   /**
    * The path to the report.
    */
   report: string;

   /**
    * The locale to use when running the report.
    */
   locale?: string;

   /**
    * The names of the printers to which the report should be printed.
    */
   printers?: string[];

   /**
    * The server-side path to save the report to as a PDF.
    */
   pdf?: string;

   /**
    * The server-side path to save the report to as a CSV file.
    */
   csv?: string;

   /**
    * The email address to which the report should be sent.
    */
   emails?: string[];

   /**
    * The email address from which the delivery and/or notification emails are sent.
    */
   sender?: string;

   /**
    * The email addresses to which a notification email should be sent that the action has been
    * performed.
    */
   notifies?: string[];

   /**
    * The format in which the report should be sent in the delivery emails. The allowable values are
    * "CSV', 'EXCEL', 'EXCEL_DATA', 'EXCEL_SHEET', 'HTML_BUNDLE', 'HTML_BUNDLE_NO_PAGINATION',
    * 'HTML_NO_PAGINATION_EMAIL', 'PDF', 'POSTSCRIPT', 'POWERPOINT', 'RTF', 'RTF_LAYOUT', 'SVG',
    * 'TEXT', and 'XML'.
    */
   format?: string;

   /**
    * The subject of the delivery and/or notification emails.
    */
   subject?: string;

   /**
    * The message body of the delivery and/or notification emails.
    */
   message?: string;

   /**
    * A flag indicating if the message body is formatted as HTML.
    */
   htmlMessage?: boolean;

   /**
    * The parameters to use when opening the report.
    */
   parameters?: {[name: string]: any};
}

/**
 * ViewsheetAction describes an action that opens a viewsheet and performs one or more sub-actions
 * on it. ViewsheetAction has a value of 'viewsheet' for the actionType property.
 */
export interface ViewsheetAction {
   /**
    * The asset identifier of the viewsheet.
    */
   viewsheet: string;

   /**
    * The name of the bookmark, if any, to open the viewsheet to.
    */
   bookmarkName?: string;

   /**
    * THe name of the user that owns the bookmark.
    */
   bookmarkUser?: string;

   /**
    * The type of bookmark. The allowable values are 'private', 'all_share', and 'group_share'.
    */
   bookmarkType?: string;

   /**
    * The email address to which the viewsheet should be sent.
    */
   emails?: string[];

   /**
    * The email address from which the delivery and/or notification emails are sent.
    */
   sender?: string;

   /**
    * The email addresses to which a notification email should be sent that the action has been
    * performed.
    */
   notifies?: string[];

   /**
    * The format in which the viewsheet should be sent in the delivery emails. The allowable values
    * are 'EXCEL', 'PDF', an 'POWERPOINT'.
    */
   format?: string;

   /**
    * The subject of the delivery and/or notification emails.
    */
   subject?: string;

   /**
    * The message body of the delivery and/or notification emails.
    */
   message?: string;

   /**
    * A flag indicating if the message body is formatted as HTML.
    */
   htmlMessage?: boolean;
}

/**
 * ScheduleApi provides operations used to query, manage, and run schedule tasks.
 */
export interface ScheduleApi {
   /**
    * Gets the list of scheduled tasks.
    *
    * @return the list of tasks.
    */
   getScheduleTasks(): Promise<ScheduleTask[]>;

   /**
    * Adds a schedule task.
    *
    * @param name       the name of the schedule task.
    * @param enabled    true to enable the task; false to disable the task.
    * @param conditions the list of conditions for the task.
    * @param actions    the list of actions performed by the task.
    */
   addScheduleTask(name: string, enabled: boolean, conditions: ScheduleCondition[],
                   actions: ScheduleAction[]): Promise<void>;

   /**
    * Gets a schedule task.
    *
    * @param name the name of the schedule task.
    *
    * @return the schedule task.
    */
   getScheduleTask(name: string): Promise<ScheduleTask>;

   /**
    * Updates a schedule task.
    *
    * @param name the name of the schedule task.
    * @param task the updated schedule task object.
    */
   updateScheduleTask(name: string, task: ScheduleTask): Promise<void>;

   /**
    * Removes a schedule task.
    *
    * @param name the name of the schedule task.
    */
   removeScheduleTask(name: string): Promise<void>;

   /**
    * Gets the list of conditions defined for a task.
    *
    * @param name the name of the task.
    *
    * @return the list of conditions.
    */
   getTaskConditions(name: string): Promise<ScheduleCondition[]>;

   /**
    * Adds a condition to a schedule task.
    *
    * @param name      the name of the task.
    * @param condition the condition to add.
    */
   addTaskCondition(name: string, condition: ScheduleCondition): Promise<void>;

   /**
    * Gets a condition of a schedule task.
    *
    * @param name  the name of the schedule task.
    * @param index the zero-based index of the condition.
    *
    * @return the requested condition.
    */
   getTaskCondition(name: string, index: number): Promise<ScheduleCondition>;

   /**
    * Updates a condition of a schedule task.
    *
    * @param name      the name of the schedule task.
    * @param index     the zero-based index of the condition.
    * @param condition the updated condition.
    */
   updateTaskCondition(name: string, index: number, condition: ScheduleCondition): Promise<void>;

   /**
    * Removes a condition of a schedule task.
    *
    * @param name  The name of the schedule task.
    * @param index The zero-based index of the condition.
    */
   removeTaskCondition(name: string, index: number): Promise<void>;

   /**
    * Gets the list of actions defined for a task.
    *
    * @param name the name of the task.
    *
    * @return the list of actions.
    */
   getTaskActions(name: string): Promise<ScheduleAction[]>;

   /**
    * Adds a action to a schedule task.
    *
    * @param name   the name of the task.
    * @param action the action to add.
    */
   addTaskAction(name: string, action: ScheduleAction): Promise<void>;

   /**
    * Gets a action of a schedule task.
    *
    * @param name  the name of the schedule task.
    * @param index the zero-based index of the action.
    *
    * @return the requested action.
    */
   getTaskAction(name: string, index: number): Promise<ScheduleAction>;

   /**
    * Updates a action of a schedule task.
    *
    * @param name   the name of the schedule task.
    * @param index  the zero-based index of the action.
    * @param action the updated action.
    */
   updateTaskAction(name: string, index: number, action: ScheduleAction): Promise<void>;

   /**
    * Removes a action of a schedule task.
    *
    * @param name  the name of the schedule task.
    * @param index the zero-based index of the action.
    */
   removeTaskAction(name: string, index: number): Promise<void>;

   /**
    * Gets the current status of a task.
    *
    * @param name the name of the schedule task.
    *
    * @return the status of the task.
    */
   getTaskStatus(name: string): Promise<ScheduleTaskStatus>;

   /**
    * Runs a schedule task immediately. The status of the task should be polled to determine when
    * and how it finishes.
    *
    * @param name the name of the task.
    */
   runTask(name: string): Promise<void>;
}
