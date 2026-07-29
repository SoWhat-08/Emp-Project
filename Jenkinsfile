pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Install React Dependencies') {
            steps {
                bat 'if exist node_modules rmdir /s /q node_modules'
                bat 'if exist package-lock.json del package-lock.json'
                bat 'npm cache clean --force'
                bat 'npm install'
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