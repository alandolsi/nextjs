// nextjs app
pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'ldiiso'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
        IMAGE_NAME = 'nextjs'
        IMAGE_TAG = 'build-${env.BUILD_NUMBER}'
    }
    stages {
        stage ('SCM Checkout') {
            steps {
                checkout scm
            }
        }
        stage ("Env Variables") {
            steps {
                echo "DOCKER_REGISTRY: ${env.DOCKER_REGISTRY}"
                echo "DOCKER_REGISTRY_CREDENTIALS: ${env.DOCKER_REGISTRY_CREDENTIALS}"
                echo "IMAGE_NAME: ${env.IMAGE_NAME}"
                echo "IMAGE_TAG: ${env.IMAGE_TAG}"
            }
        }
        stage ('Build') {
            steps {
                bat '''
                    docker build -t nextjs:latest .
                    docker tag nextjs:latest ldiiso/nextjs:build-${env.BUILD_NUMBER}
                    docker push ldiiso/nextjs:build-${env.BUILD_NUMBER}
                '''
            }
        }

    }
}
