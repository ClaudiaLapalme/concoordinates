// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/** 
* THIS IS A TEMPLATE
* Add your API key and CLIENT ID on lines 15 and 16
* go to the /src using bash
* execute the command: git update-index --skip-worktree <path-name>
* this will allow you to keep the key locally and git will stop tracking the fil
*/

export const environment = {
    production: false,
    API_KEY: '<API_KEY>',
    CLIENT_ID: '<CLIENT_ID>'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
