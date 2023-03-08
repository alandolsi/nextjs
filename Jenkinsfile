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
                    // echo '\033[34mHello\033[0m \033[33mcolorful\033[0m \033[35mworld!\033[0m'
                    echo '\033[34m######################################################################################\033[0m'
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat '''
                        docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} .
                        docker tag ${env.IMAGE_NAME}:${env.IMAGE_TAG} ${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}
                        '''
                    }
                    echo '\033[34m######################################################################################\033[0m'
            }
            post {
                success {
                    echo '\033[35m######################################################################################\033[0m'
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat '''
                           docker push ${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}
                        '''
                    }
                    echo '\033[35m######################################################################################\033[0m'
                }
            }
        }
        // stage('Push image') {
        //     steps {
        //         withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
        //             bat '''
        //                 docker build -t nextjs:latest .
        //                 docker tag nextjs:latest ldiiso/nextjs:latest
        //                 docker push ldiiso/nextjs:latest
        //             '''
        //         }
        //     }
        // }
        // stage ('Promotion') {
        //     agent none
        //     steps {
        //         input message: 'Promote to production?', ok: 'Yes'
        //     }
        // }
        // stage ('Deploy localy') {
        //     steps {
        //         withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
        //             bat '''
        //                 // docker remove old container
        //                 docker service rm nextjs_app
        //                 // docker remove old image
        //                 docker rmi ldiiso/nextjs:latest
        //                 // docker pull new image
        //                 docker pull ldiiso/nextjs:latest
        //                 // docker deploy new image
        //                 docker stack deploy -c docker-compose.yml nextjs
        //                 echo "Deployed"
        //             '''
        //         }
        //     }
        // }

    }
}
