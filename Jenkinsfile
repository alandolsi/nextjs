// nextjs app
pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'docker.io/ldiiso'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
        IMAGE_NAME = 'nextjs'
        IMAGE_TAG = 'latest'
    }
    stages {
        stage ('SCM Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Build') {
            steps {
                bat 'docker build -t nextjs:latest .'
                bat 'docker tag nextjs:latest ldiiso/nextjs:latest'
                bat 'docker push ldiiso/nextjs:latest'
            }
        }

    }
}
