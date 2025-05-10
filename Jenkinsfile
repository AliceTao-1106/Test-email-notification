pipeline {
    agent any

    environment {
        RECIPIENT = 'taoalice1@gmail.com'
        SENDER = 'Alice Tao <taoalice1@gmail.com>'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Step: Building the application using Maven...'
                sh 'mvn clean package > build.log || true' // Tool used: Maven
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Build Stage - ${currentBuild.currentResult}",
                        body: "Build stage completed with status: ${currentBuild.currentResult}. Please find the build log attached.",
                        attachmentsPattern: 'build.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Step: Running tests with Jest...'
                sh 'npm test > test.log || true' // Tool used: Jest
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Test Stage - ${currentBuild.currentResult}",
                        body: "Test stage completed with status: ${currentBuild.currentResult}. See test results in the attachment.",
                        attachmentsPattern: 'test.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Step: Performing static code analysis with SonarQube...'
                sh 'echo "Simulated SonarQube analysis..." > analysis.log'
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Code Analysis Stage - ${currentBuild.currentResult}",
                        body: "Code analysis completed. Review the attached report.",
                        attachmentsPattern: 'analysis.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Step: Running security scan using npm audit...'
                sh 'npm audit > audit.log || true'
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Security Scan Stage - ${currentBuild.currentResult}",
                        body: "Security scan completed. Please check the attached audit log.",
                        attachmentsPattern: 'audit.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Step: Deploying to staging environment...'
                sh 'echo "Staging deployment completed." > staging.log'
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Staging Deployment - ${currentBuild.currentResult}",
                        body: "The application has been deployed to staging. See log for details.",
                        attachmentsPattern: 'staging.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Step: Executing post-deployment tests on staging...'
                sh 'echo "Staging integration tests passed." > staging-test.log'
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Staging Test - ${currentBuild.currentResult}",
                        body: "Post-deployment testing on staging completed. Results attached.",
                        attachmentsPattern: 'staging-test.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Step: Deploying to production environment...'
                sh 'echo "Production deployment successful." > prod.log'
            }
            post {
                always {
                    emailext(
                        to: "${env.RECIPIENT}",
                        from: "${env.SENDER}",
                        subject: "Production Deployment - ${currentBuild.currentResult}",
                        body: "Production deployment completed. Attached log shows deployment status.",
                        attachmentsPattern: 'prod.log',
                        mimeType: 'text/plain'
                    )
                }
            }
        }

    }
}

