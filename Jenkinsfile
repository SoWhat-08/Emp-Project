pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Install React Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build React App') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'npm run build'
            }
        }

        stage('Install Python Dependencies') {
            steps {
                dir('backend') {
                    bat 'pip install -r requirements.txt'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'WorkHub Build Successful!'
        }
        failure {
            echo 'WorkHub Build Failed!'
        }
    }
}