#!/usr/bin/env groovy
pipeline {
    agent any
    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
        buildDiscarder logRotator(daysToKeepStr: '30')
        ansiColor('xterm')
    }
    environment {
        DOCKER_REGISTRY = 'ldiiso'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
        IMAGE_NAME = 'nextjs'
        ISOADCA = credentials('isoadCa')
    }
    stages {
        stage ('Checkout') {
            steps {
                script {
                    echo '\033[36m######################################################################################\033[0m'
                    env.GIT_COMMIT = checkout(scm).GIT_COMMIT[0..10]
                    echo '\033[36m######################################################################################\033[0m'
                }
            }
        }
        stage ('Build image') {
            steps {
                echo '\033[35m######################################################################################\033[0m'
                script {
                    withCredentials([file(credentialsId: ISOADCA, variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {
                        // write file to workspace
                        writeFile file: 'isoadCa.cert', text: readFile(ISOADCA_SSL_CERT_SECRET_FILE)

                        bat "docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT} ."

                    }
                }
                echo '\033[35m######################################################################################\033[0m'

            }
        }
        stage ('Push image') {
            steps {
                script {
                    withDockerRegistry([ credentialsId: DOCKER_REGISTRY_CREDENTIALS, url: ""]) {
                        bat "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}"
                    }
                }
            }
        }
        stage ('Deploy localy') {
            steps {
                script {
                    echo '\033[34m######################################################################################\033[0m'
                    bat "docker stack deploy -c docker-compose.yml ${IMAGE_NAME}"
                    echo '\033[34m######################################################################################\033[0m'
                }
            }
            post {
                success {
                    echo '\033[37mDeployed Successfully!\033[0m'
                }
            }
        }
    }
}
