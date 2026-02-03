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

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --project=Chrome'
            }
        }
    }

    stage('Publish Test Results') 
    { 
        steps 
        { 
            junit 'test-results/results.xml' 
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true 
        }
}
