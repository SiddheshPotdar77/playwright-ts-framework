pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/SiddheshPotdar77/playwright-ts-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                // Configure Playwright to output JUnit XML
                bat 'npx playwright test --reporter=junit --output=test-results'
            }
        }
    }

    post {
        always {
            // Pick up JUnit XML results
            junit 'test-results/*.xml'
            // Archive Playwright HTML report for later viewing
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
