call cd ../profsouz-test-task-frontend
call npm run build
call cd ../dockers && docker compose up -d

call exit /B 0