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
                bat 'printenv'
                bat 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                bat 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

    }
}
