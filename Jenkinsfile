// nextjs app
pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Build') {
            steps {
                bat 'echo "Building..."'
                bat 'npm install'
                bat 'npm run build'
            }
        }

    }
}
