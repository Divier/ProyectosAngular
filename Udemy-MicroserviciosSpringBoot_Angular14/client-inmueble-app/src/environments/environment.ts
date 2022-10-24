// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    config :{
      apiKey: "AIzaSyBMocYUAOQ0clJnySQHLhQtPwaNZz5tTj0",
      authDomain: "curso-angular-14.firebaseapp.com",
      projectId: "curso-angular-14",
      storageBucket: "curso-angular-14.appspot.com",
      messagingSenderId: "381210135467",
      appId: "1:381210135467:web:d8905b62a2ad66ad5c20ee"
    }
  },
  url: "http://localhost:5555/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
