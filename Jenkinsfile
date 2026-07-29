pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Install React Dependencies') {
            steps {
                bat '''
                if exist node_modules rmdir /s /q node_modules
                if exist package-lock.json del package-lock.json
                npm cache clean --force
                npm install
                '''
            }
        }

        stage('Build React App') {
            steps {
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
        success {
            echo 'WorkHub Build Successful!'
        }

        failure {
            echo 'WorkHub Build Failed!'
        }

        always {
            cleanWs()
        }
    }
}