#!/usr/bin/env groovy
pipeline {
    agent {
        docker {
            image 'ldiiso/nextjs:latest'
        }
    }
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
                    withCredentials([file(credentialsId: 'isoadCa', variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {

                        writeFile file: 'isoadCa.cert', text: ISOADCA_SSL_CERT_SECRET_FILE


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
                echo '\033[34m######################################################################################\033[0m'
                withDockerRegistry([ credentialsId: DOCKER_REGISTRY_CREDENTIALS, url: ""]) {
                    withCredentials([file(credentialsId: 'isoadCa', variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {
                        script {
                            env.ISOADCA_SSL_CERT_SECRET_NAME = ISOADCA_SSL_CERT_SECRET_FILE
                        }
                        bat "docker stack deploy -c docker-compose.yml ${IMAGE_NAME}"
                    }
                }
                echo '\033[34m######################################################################################\033[0m'
            }
            post {
                success {
                    // copy file from jenkins worksapce to container
                    // bat "docker cp isoadCa ${IMAGE_NAME}_nextjs.1.0:/opt/app/isoadCa"
                    echo '\033[37mDeployed Successfully!\033[0m'
                }
            }
        }
        // remove build from registry
        // stage ('Remove image') {
        //     steps {
        //         script {
        //             withDockerRegistry([ credentialsId: DOCKER_REGISTRY_CREDENTIALS, url: ""]) {
        //                 bat "docker rmi ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}"
        //             }
        //         }
        //     }
        // }
    }
}
