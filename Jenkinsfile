pipeline {
    agent {
        node {
            label 'mac-mini'
        }
    }
    // environment {}
    stages {
        // stage('Get Repo') {
        //     steps {
        //         checkout([
        //             $class: 'GitSCM', 
        //             branches: [[name: 'ops/jenkins']], 
        //             userRemoteConfigs: [[url: 'https://github.com/UnosquareBelfast/admin-web/']]])
        //     }
        // }
        stage("Set environmental vars"){
            steps {
                withAWSParameterStore(credentialsId: 'uno-aws-global-creds', naming: 'relative', path: '/unosquare/project/internal/PROD', recursive: true, regionName: 'eu-west-1', namePrefixes:'') {
                    script {
                        env.BUCKET_NAME = "${env.PARAM_S3_S3BUCKET}"
                        env.DOMAIN = "http://${env.PARAM_ELB_ECSALBDNS}"
                    }
                }
            }
        }
        stage('Node install packages') {
            steps {
                nvm('lts/carbon'){
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
                sh "sed -ie 's/bundle.js/bundle.js?v=${env.BUILD_ID}/' dist/index.html"
                withAWS(region:'eu-west-1', credentials:'uno-aws-global-creds') {
                    s3Upload(file:'dist', bucket:"${env.BUCKET_NAME}", path:'', acl:'PublicRead')
                }
                step([$class: 'WsCleanup'])
            }
        }
    }
}