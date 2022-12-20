call cd ../profsouz-test-task-frontend
call npm run build
call cd ../dockers && docker compose build

call exit /B 0