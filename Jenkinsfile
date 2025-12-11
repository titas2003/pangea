pipeline {
    agent {
        label {
            label 'slave-01'
            retries 2
        }
    }

    environment {
        GIT_URL = "https://github.com/titas2003/pangea.git"
        GIT_BRANCH = "main"
        GITHUB_USER  = "github_titas"
        PORT = 3000
        MONGO_URI = "mongodb+srv://admin:admin@aws-dmo.bsoplpt.mongodb.net/projectX"
        JWT_SECRET = "secret"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Downloading the project from ${GIT_URL}..."
                git branch: "${GIT_BRANCH}", credentialsId: "${GITHUB_USER}", url: "${GIT_URL}"
            }
        }

        stage("Build docker image") {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'titas2003', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    sh '''
                        ls -l
                        pwd
                        ip a
                        echo "Building Docker image..."
                        sudo docker build -t hellopipe:v1.${BUILD_NUMBER} .

                        echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
                    '''
                }
            }
        }
    }
}