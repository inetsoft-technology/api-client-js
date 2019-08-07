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
 * FileApi provides operations used to import, export, and migrate content.
 */
export interface FileApi {
   /**
    * Converts a library file or directory.
    *
    * @param extract true if the file should be extracted or false if the directory packaged.
    */
   convertLibrary(extract: boolean): Promise<void>;

   /**
    * Converts and indexed storage file or directory.
    *
    * @param extract   true if the file should be extracted or false if the directory packaged.
    * @param overwrite true to overwrite existing files.
    */
   convertStorage(extract: boolean, overwrite: boolean): Promise<void>;

   /**
    * Imports assets into the repository.
    *
    * @param data      the binary content of asset ZIP file.
    * @param excluded  the identifiers of the assets to be excluded from the import.
    * @param overwrite true to overwrite existing assets.
    */
   importAssets(data: ArrayBuffer, excluded: string[], overwrite: boolean): Promise<void>;

   /**
    * Exports assets from the repository.
    *
    * @param name     the name of the exported ZIP file.
    * @param includes the list of patterns matching assets to include.
    * @param excludes the list of patterns matching assets to exclude.
    *
    * @return the binary content of asset ZIP file.
    */
   exportAssets(name: string, includes: string[], excludes: string[]): Promise<ArrayBuffer>;

   /**
    * Uploads the local file system data space to the database data space or downloads the database
    * data space to the local file system data space.
    *
    * @param download  true to download the database the file system; false to upload the file
    *                  system to the database.
    * @param overwrite true to overwrite existing files; false to retain existing files.
    */
   copyDataSpace(download: boolean, overwrite: boolean): Promise<void>;
}
