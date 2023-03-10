// nextjs app
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
        ISOADCA = 'isoadca'
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
                        writeFile file: 'test/isoadCA.cert', text: readFile(ISOADCA_SSL_CERT_SECRET_FILE)
                    }
                    bat "docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT} ."

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
                        bat "
                            docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}
                            docker stop ${IMAGE_NAME}
                            docker rm ${IMAGE_NAME}
                            docker run -d --name ${IMAGE_NAME} -p 3000:3000 ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}
                        "

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
