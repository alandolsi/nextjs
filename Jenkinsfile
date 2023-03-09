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
        IMAGE_TAG = '1.0.2'
        ISOADCA = 'isoadca'
    }
    stages {
        stage ('Build image') {
            steps {
                    echo '\033[34m######################################################################################\033[0m'
                    withCredentials([file(credentialsId: ISOADCA, variable: 'ISOADCA_SSL_CERT_SECRET_FILE')]) {
                        writeFile file: 'test2.txt', text: readFile(ISOADCA_SSL_CERT_SECRET_FILE)
                    }
                    bat '''
                            docker build -t ldiiso/nextjs:1.0.3 .
                        '''


                    echo '\033[34m######################################################################################\033[0m'
            }
            post {
                success {
                    echo '\033[35m######################################################################################\033[0m'
                    withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
                        bat '''
                            docker push ldiiso/nextjs:1.0.3
                        '''
                    }
                    echo '\033[35m######################################################################################\033[0m'
                }
            }
        }
        // stage ('Promotion') {
        //     agent none
        //     steps {
        //         input message: '\033[35mPromote to production?\033[0m', ok: 'Yes'
        //     }
        // }
        // stage ('Deploy localy') {
        //     steps {
        //         withDockerRegistry([ credentialsId: "${env.DOCKER_REGISTRY_CREDENTIALS}", url: "" ]) {
        //             bat '''
        //                 docker pull ldiiso/nextjs:1.0.0
        //                 docker stack deploy -c docker-compose.yml nextjs
        //             '''
        //         }
        //     }
        //     post {
        //         success {
        //             echo '\033[32mDeployed Successfully!\033[0m'
        //         }
        //     }
        // }

    }
}
