
pipeline {

    agent none

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Parallel CI') {

            failFast true

            parallel {

                stage('Backend CI') {

                    agent {
                        label 'linux-node'
                    }

                    tools {
                        nodejs 'NodeJS20'
                    }

                    stages {

                        stage('Checkout Backend') {
                            steps {
                                checkout scm
                            }
                        }

                        stage('Install Backend') {
                            steps {
                                dir('todo-backend') {
                                    sh 'npm ci'
                                }
                            }
                        }

                        stage('Backend Tests') {
                            steps {
                                dir('todo-backend') {
                                    sh 'npm test -- --runInBand'
                                }
                            }
                        }
                    }
                }

                stage('Frontend CI') {

                    agent {
                        label 'linux-node'
                    }

                    tools {
                        nodejs 'NodeJS20'
                    }

                    stages {

                        stage('Checkout Frontend') {
                            steps {
                                checkout scm
                            }
                        }

                        stage('Install Frontend') {
                            steps {
                                dir('todo-frontend') {
                                    sh 'npm ci'
                                }
                            }
                        }

                        stage('Frontend Lint') {
                            steps {
                                dir('todo-frontend') {
                                    sh 'npm run lint'
                                }
                            }
                        }

                        stage('Frontend Tests') {
                            steps {
                                dir('todo-frontend') {
                                    sh 'CI=true npm test -- --watchAll=false'
                                }
                            }
                        }

                        stage('Frontend Build') {
                            steps {
                                dir('todo-frontend') {
                                    sh 'npm run build'
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'All CI checks passed!'
        }

        failure {
            echo 'CI failed. Check the failed stage.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
