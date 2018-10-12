pipeline {
    agent {
        node {
            label 'mac-mini'
        }
    }
    environment {
        DOMAIN = 'https://api.domain.com'
    }
    stages {
        // stage('Get Repo') {
        //     steps {
        //         checkout([
        //             $class: 'GitSCM', 
        //             branches: [[name: 'ops/jenkins']], 
        //             userRemoteConfigs: [[url: 'https://github.com/UnosquareBelfast/admin-web/']]])
        //     }
        // }
        stage('Node install packages') {
            steps {
                nvm('lts/carbon'){
                    sh 'env'
                    sh "npm install"
                }
            }
        }

        stage("Node build application") {
            steps {
                nvm('lts/carbon'){
                    sh "npm run build"
                }
            }
        }

        stage("Deploy to S3") {
            input {
                message "Should we deploy the project?"
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'uno-aws-global-creds') {
                    s3Upload(file:'dist', bucket:'vb5kuu3alfcx-jenkins.com', path:'', acl:'PublicRead')
                }
                step([$class: 'WsCleanup'])
            }
        }
    }
}