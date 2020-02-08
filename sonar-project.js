// sonarqube coverage
const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
            'sonar.login': 'admin',
            'sonar.password': 'admin',
            'sonar.projectKey': 'pikaroute',
            'sonar.language': 'ts',
          //   'sonar.login': '7e8e70d83687f326ad51409d8858656e7b98a710',
            'sonar.sources': 'src/app',             // include sources from src/app
            'sonar.exclusions' : '**/*.spec.ts',   // exclude .spec.ts files
            'sonar.tests': 'src/app',             // include sources from src/app
            'sonar.test.inclusions': '**/*.spec.ts',          // include all ts files
            'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
          //   'sonar.testExecutionReportPaths': 'test-report.xml',
       }
     }, () => {});