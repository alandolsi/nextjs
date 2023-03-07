// nextjs app
pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
    }
    stages {
        stage ('SCM Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Build') {
            steps {
                bat 'docker build -t $DOCKER_REGISTRY/$DOCKER_REGISTRY_CREDENTIALS/nextjs .'

            }
        }

    }
}
