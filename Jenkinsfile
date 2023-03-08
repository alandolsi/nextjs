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
                input message: '\033[35mPromote to production?\033[0m', ok: 'Yes'
            }
        }
        stage ('Deploy localy') {
            steps {
                withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                    bat '''
                        docker service rm nextjs_app
                        docker rmi ldiiso/nextjs:latest
                        docker pull ldiiso/nextjs:latest
                        docker stack deploy -c docker-compose.yml nextjs
                        echo "\033[32mDeployed\033[0m"
                    '''
                }
            }
        }

    }
}
