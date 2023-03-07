// nextjs app
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        CI = 'true'
        DOCKER_REGISTRY = 'hub.docker.com'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
        DOCKER_IMAGE = 'ldiiso/nextjs'
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Build') {
            steps {
                sh 'echo "Building..."'
            }
        }

    }
}
