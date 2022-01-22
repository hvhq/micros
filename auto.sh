docker-compose build
docker push 192.168.56.1:5000/gateway
docker push 192.168.56.1:5000/authentication
docker push 192.168.56.1:5000/content
docker push 192.168.56.1:5000/database
scp -r ./* hw@192.168.56.101:~/micros