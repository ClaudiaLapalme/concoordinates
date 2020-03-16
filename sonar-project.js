// sonarqube coverage
const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
            'sonar.login': 'admin',
            'sonar.password': 'admin',
            'sonar.projectKey': 'pikaroute',
            'sonar.language': 'ts',
            'sonar.sources': 'src/app',             // include sources from src/app
            'sonar.exclusions' : 'src/app/json-typings.d.ts, **/*.spec.ts, **/node_modules/**',    // exclude .spec.ts files
            'sonar.tests': 'src/app',               // include sources from src/app
            'sonar.test.inclusions': '**/*.spec.ts',          // include all ts files
            'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info', // path to lcov.info
            'sonar.javascript.node.maxspace':'4096',
       }
     }, () => {});