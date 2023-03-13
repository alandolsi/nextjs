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
        IMAGE_TAG = 'latest'
        ISOADCA = "isoadCa"
    }
    stages {
        stage ('Checkout') {
            steps {
                script {
                    echo '\033[30m######################################################################################\033[0m'
                    env.GIT_COMMIT = checkout(scm).GIT_COMMIT[0..10]
                    echo '\033[30m######################################################################################\033[0m'
                }
            }
        }
        stage ('Build image') {
            steps {
                script {
                    echo '\033[31m######################################################################################\033[0m'

                    withCredentials([file(credentialsId: ISOADCA, variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {
                        script {
                            env.ISOADCA_SSL_CERT_SECRET_FILE = readFile ISOADCA_SSL_CERT_SECRET_FILE

                            bat "type ${ISOADCA_SSL_CERT_SECRET_FILE} > ${ISOADCA_SSL_CERT_SECRET_FILE}.pem"
                        }
                    }
                    // bat "docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT} ."
                    bat " docker-compose -f docker-compose.yml build"

                    echo '\033[31m######################################################################################\033[0m'
                }
            }
            post {
                success {
                    script {
                        echo '\033[35m######################################################################################\033[0m'

                        withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                            bat "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}"
                        }

                        echo '\033[35m######################################################################################\033[0m'
                    }
                }
            }
        }
        stage ('Promotion') {
            agent none
            steps {
                input message: '\033[36mPromote to production?\033[0m', ok: 'Yes'
            }
        }
        stage ('Deploy localy') {
            steps {
                script {
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat "docker-compose -f docker-compose.yml up -d"
                     }
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
