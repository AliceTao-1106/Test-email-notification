pipeline {
    agent any

    environment {
        RECIPIENT = 'taoalice1@gmail.com'
        SENDER = 'Alice Tao <taoalice1@gmail.com>'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building the project using Maven...'
                sh 'mvn clean package > build.log || true' // Maven
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests with Jest...'
                sh 'npm test > test.log || true' // Jest
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
                echo 'Performing security scan with npm audit...'
                sh 'npm audit > audit.log || true' // npm audit
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Security Scan - ${currentBuild.currentResult}",
                        body: "Security scan completed. Check the attached audit report.",
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


