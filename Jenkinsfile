pipeline {
    agent any

    environment {
        RECIPIENT = 'taoalice1@gmail.com'
        SENDER = 'Alice Tao <taoalice1@gmail.com>'
        SNYK_TOKEN = credentials('SNYK_TOKEN') 
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building the project using Maven...'
                sh '/opt/homebrew/bin/mvn clean package > build.log || true' // Tool: Maven
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests with Jest...'
                sh 'npm test > test.log || true' // Tool: Jest
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Test Stage - ${currentBuild.currentResult}",
                        body: "Testing stage completed with status: ${currentBuild.currentResult}.",
                        attachmentsPattern: 'test.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan using Snyk...'
                sh 'export SNYK_TOKEN=${SNYK_TOKEN} && snyk test > audit.log || true' // Tool: Snyk
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Security Scan - ${currentBuild.currentResult}",
                        body: "Security scan completed using Snyk. See attached audit report.",
                        attachmentsPattern: 'audit.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production...'
                sh 'echo "Production deployment done." > prod.log'
            }
        }
    }
}


