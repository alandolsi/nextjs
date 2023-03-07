// nextjs app
pipeline {
    agent any

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
