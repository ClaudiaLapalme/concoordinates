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

1. go to the application folder in GitBash
2. ionic serve
   - ionic will indicate the local host address
   - should be localhost:8100

### How to run the app on an android phone

1. npm i -g native-run (if first time building)
2. `ionic capacitor add android`
3. `ionic build`
4. `npx cap add android`
5. `npx cap open android`