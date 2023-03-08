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
        stage('Push image') {
            steps {
                withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                    bat '''
                        docker build -t nextjs:latest .
                        docker tag nextjs:latest ldiiso/nextjs:latest
                        docker push ldiiso/nextjs:latest
                    '''
                }
            }
        }
        stage ('Promotion') {
            agent none
            steps {
                input message: 'Promote to production?', ok: 'Yes'
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
                        docker stack deploy -c docker-compose.yml nextjs
                        echo "Deployed T"
                    '''
                }
            }
        }

    }
}
