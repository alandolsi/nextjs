// nextjs app
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        CI = 'true'
        DOCKER_REGISTRY = 'hub.docker.com'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub'
        DOCKER_IMAGE = 'ldiiso/nextjs'
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        // stage ('Build') {
        //     steps {
        //         sh 'docker build -t $DOCKER_IMAGE:$GIT_COMMIT .'
        //         sh 'echo $DOCKER_IMAGE:$GIT_COMMIT'


        //         // sh 'docker tag $DOCKER_IMAGE:$GIT_COMMIT $DOCKER_IMAGE:latest'

        //         // withCredentials([usernamePassword(credentialsId: DOCKER_REGISTRY_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        //         //     sh 'docker login -u $USERNAME -p $PASSWORD $DOCKER_REGISTRY'
        //         // }

        //         // sh 'docker push $DOCKER_IMAGE:$GIT_COMMIT'

        //     }
        // }

    }
}
