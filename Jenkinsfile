pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Install React Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Install Python Dependencies') {
            steps {
                dir('backend') {
                    sh '''
                        python3 -m venv venv
                        . venv/bin/activate
                        python -m pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ WorkHub Build Successful!'
        }
        failure {
            echo '❌ WorkHub Build Failed!'
        }
    }
}
