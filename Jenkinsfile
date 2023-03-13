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
                    env.ISOADCA_SSL_CERT_SECRET_NAME = 'isoadCa.cert'
                    env.ISOADCA_SSL_CERT_SECRET_FILE = '/var/jenkins_home/workspace/nextjs/isoadCa.cert'

                    withCredentials([file(credentialsId: ISOADCA, variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {
                        writeFile file: ISOADCA_SSL_CERT_SECRET_FILE, text: ISOADCA_SSL_CERT_SECRET_FILE
                        bat "docker-compose -f docker-compose.yml build"
                    }
                    echo '\033[31m######################################################################################\033[0m'
                }
            }
        }
        stage ('Deploy localy') {
            steps {
                script {
                    echo '\033[32m######################################################################################\033[0m'
                    bat "docker-compose -f docker-compose.yml up -d --build"
                    echo '\033[32m######################################################################################\033[0m'
                }
            }
            post {
                success {
                    echo '\033[37mDeployed Successfully!\033[0m'
                }
            }
        }
        // copy file to container
        stage ('Copy file to container') {
            steps {
                script {
                    echo '\033[33m######################################################################################\033[0m'
                    bat "docker cp isoadCa.cert ${IMAGE_NAME}_app_1:/opt/app/isoadCa.cert"
                    echo '\033[33m######################################################################################\033[0m'
                }
            }
        }

    }
}
