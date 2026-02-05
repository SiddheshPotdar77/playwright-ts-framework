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

        stage('Run Smoke Tests') {
            steps {
                // Run only smoke tests (tagged @smoke in your specs)
                bat 'npx playwright test --project=smoke'
            }
        }

        stage('Run Sanity Tests') {
            steps {
                // Run only sanity tests (tagged @sanity in your specs)
                bat 'npx playwright test --project=sanity'
            }
        }

        stage('Publish Test Results') {
            steps {
                // Always publish reports, even if tests failed
                junit 'test-results/results.xml'
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
            post {
                always {
                    junit 'test-results/results.xml'
                    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                }
            }
        }
    }
}
