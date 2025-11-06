pipeline {
    agent any

    environment {
        WORKDIR = "/var/jenkins_home/workspace/PredictiveSystem"
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                script {
                    echo "📁 Copiando proyecto al workspace interno de Jenkins..."
                    // Asegúrate de haber copiado tu proyecto dentro de WORKDIR
                    sh "ls -l $WORKDIR"
                }
            }
        }

        stage('Build & Start Services') {
            steps {
                script {
                    echo "🚀 Levantando DB, backend y frontend..."
                    sh """
                    cd $WORKDIR
                    docker compose -f docker-compose.yml down || true
                    docker compose -f docker-compose.yml up -d --build db backend frontend
                    """
                }
            }
        }

        stage('Backend Unit Tests (Maven)') {
            steps {
                script {
                    echo "🔎 Ejecutando tests de unidad del backend usando contenedor Maven..."
                    sh """
                    docker run --rm \
                        -v $WORKDIR/winepredictiveBack:/work \
                        -w /work \
                        maven:3.9.4-eclipse-temurin-17 mvn -B test
                    """
                }
            }
        }

        stage('Frontend & E2E Tests (Cypress)') {
            steps {
                script {
                    echo "🧪 Ejecutando tests E2E con Cypress..."
                    sh """
                    docker exec -w /e2e wine_cypress \
                        npx cypress run --reporter html --reporter-options "output=reports/test-report.html"
                    """
                }
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML(target: [
                    reportName: 'Cypress Test Report',
                    reportDir: 'cypressPredictiveSystem/reports',
                    reportFiles: 'test-report.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }
    }

    post {
        always {
            script {
                echo "🧹 Limpiando contenedores (DB, backend, frontend)..."
                sh """
                cd $WORKDIR
                docker compose -f docker-compose.yml stop db backend frontend || true
                docker compose -f docker-compose.yml rm -f db backend frontend || true
                docker rm -f \$(docker ps -q -f name=wine_cypress) || true
                """
            }
        }
    }
}
