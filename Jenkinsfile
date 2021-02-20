pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
        }
      }
      stage('Nodejs') {
        agent {
          docker {
            reuseNode 'true'
            registryUrl 'https://coding-public-docker.pkg.coding.net'
            image 'public/docker/nodejs:14'
          }

        }
        post {
          success {
            sh 'npm install'
            sh 'node ./index.js'

          }

        }
        steps {
          echo 'Begin'
          sh 'node --version'
          sh 'npm --version'
        }
      }
    }
  }