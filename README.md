# pikaroute

Lost on campus? Pikaroute will help you pick a route (SOEN 390 Project)

## Set up for Windows and Linux

### Installations

1. Install GitBash or any other terminal
2. Install Node.js and / or update to the latest version
3. `npm install -g ionic`
4. npm install @ionic/angular@latest --save

### Dev setup

#### SonarQube local setup

- Install docker: <https://docs.docker.com/install/>
- If on linux, to use docker without having to sudo:

```bash
sudo usermod -aG docker $USER
```

- Launch local sonarqube image:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube
```

- Login to <http://localhost:9000/> (default is admin:admin)
- Wait for SonarQube to setup
- Click add new project and follow the instructions provided by SonarQube (depends on your OS)
- If sonar can't find typescript, run npm install -D typescript in W10

### Running sonarqube

1. open bash
2. `npm run sonar`

Note: `sonar-scanner` does NOT work. It will fail to exclude the excluded files.

### API keys setup

Note: api keys and the client id are available through the credentials section of your google-cloud-platform account.

1. From project repository, in src/index.html replace <GOOGLE_API_PLACEHOLDER> with your google api key.
2. From project repository, in src/environments/environment.ts replace <API_KEY> and <CLIENT_ID> with your own api key and client id.
3. From project repository, in src/environments/environment.prod.ts replace <CLIENT_ID> with your own api key and client id.

### Firebase setup

1. Create a Firebase project and follow the steps for adding and configuring an android app. This will produce a google-services.json file.
2. Use the information from the google-services.json file to fill out the config variable in src/environments/environment.ts.

**Note:** The app is now configured for web logins, the remaining setup for android logins will be covered in the following section.

### Android setup

Note: Use vscode to program. Android is just to launch the app on a mobile android device

<https://code.visualstudio.com/docs/setup/setup-overview>

1. Install Java 8
    - FOund on the Oracle website
    - Note: Cordova is not compatible with the latest version of Java
2. Install Gradle
    - <https://gradle.org/install/>
3. Install Android Studio
    - <https://developer.android.com/studio/>
    - Once you open Android Studio, install Android 9.0


### How to run the app

#### On a computer

1. go to the application folder in GitBash
2. ionic serve
   - ionic will indicate the local host address
   - should be localhost:8100

#### On a mobile device

1. `ionic cap run android`
2. Build the project (Ctrl + F9)
3. Press the green play arrow on the top right corner in the Android Studio window that opened

**Note:** You may have to uninstall an older version of the app on your phone for the changes to apply

### How to set up the app on an android phone

1. `npm i -g native-run` (unecessary if the project is already set up)
2. `ionic build`
3. `npx cap add android` or `ionic cap add android`
4. `npx cap open android`
5. Link firebase to the app. (This only needs to be done once)
    - From android studio (after setp 4), open the firbase assistant in `tools > firebase`.
    - Navigate to `Authentication > Email and Password authentication`
    - Complete step-1 `connect to firebase`. **Do not complete any subsequent steps.**
6. The app is now configured and connected to firebase, click run to try. 
7. Open `app/manifests/AndroidManifest.xml` in Android Studio
    - Enter the <activity> bracket
    - Add `android:windowSoftInputMode="adjustNothing"` at the end of the bracket (after `android:launchMode="singleTask`)

### How to run integration tests

1. Install the Selenium IDE chrome extension 
2. Open the Selenium IDE
3. Click `Open an existing project`
4. Open `src/gui-tests/gui-tests.side`
5. Have the application running locally through the entirety of the system testing phase
6. Run tests either individually or as a suite