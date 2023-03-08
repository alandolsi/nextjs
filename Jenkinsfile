// nextjs app
pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    environment {
        DOCKER_REGISTRY = 'ldiiso'
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
        stage ('Build image') {
            steps {
                    echo '\033[34m######################################################################################\033[0m'
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat '''
                        docker build -t nextjs:latest .
                        docker tag nextjs:latest ldiiso/nextjs:latest
                        '''
                    }
                    echo '\033[34m######################################################################################\033[0m'
            }
            post {
                success {
                    echo '\033[35m######################################################################################\033[0m'
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat ''' docker push ldiiso/nextjs:latest'''
                    }
                    echo '\033[35m######################################################################################\033[0m'
                }
            }
        }
        stage ('Promotion') {
            agent none
            steps {
                input message: '\033[35mPromote to production?\033[0m', ok: '\033[33mYes\033[0m'
            }
        }
        stage ('Deploy localy') {
            steps {
                withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                    bat '''
                        // docker remove old container
                        docker service rm nextjs_app
                        // docker remove old image
                        docker rmi ldiiso/nextjs:latest
                        // docker pull new image
                        docker pull ldiiso/nextjs:latest
                        // docker deploy new image
                        docker stack deploy -c docker-compose.yml nextjs
                        echo "Deployed"
                    '''
                }
            }
        }

    }
}
