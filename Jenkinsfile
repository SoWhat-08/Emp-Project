pipeline {
    agent any

    stages {

        stage('Install React Dependencies') {
            steps {
                bat 'npm install'
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
    }
}