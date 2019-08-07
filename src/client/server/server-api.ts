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
 * ServerResourceUsage contains information about the server resource usage on a host at a
 * particular point in time.
 */
export interface ServerResourceUsage {
   /**
    * The ISO 8601-formatted date and time at which the resource usage was recorded.
    */
   timestamp: string;

   /**
    * The hostname of the machine from which the resource usage was recorded.
    */
   host: string;

   /**
    * The CPU usage as a percentage.
    */
   cpuUsage: number;

   /**
    * The memory usage in bytes.
    */
   memoryUsage: number;

   /**
    * The number of times that the garbage collector has run during the last sampling period.
    */
   gcCount: number;

   /**
    * The total amount of time, in milliseconds, that was spent in garbage collection during the
    * last sampling interval.
    */
   gcTime: number;

   /**
    * The number of reports that were executed during the last sampling interval.
    */
   executingReports: number;

   /**
    * The number of viewsheets that were executed during the last sampling interval.
    */
   executingViewsheets: number;

   /**
    * The number of queries that were executed during the last sampling interval.
    */
   executingQueries: number;
}

/**
 * ServerApi provides operations for getting information about the servers.
 */
export interface ServerApi {
   /**
    * Gets the server usage history.
    *
    * @return a list of ServerResourceUsage structures with data sampled at a regular interval.
    */
   getUsageHistory(): Promise<ServerResourceUsage[]>;
}
