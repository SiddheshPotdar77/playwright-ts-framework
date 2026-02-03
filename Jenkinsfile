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
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'   // configure Playwright to output JUnit XML
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
