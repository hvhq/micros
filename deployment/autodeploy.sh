microk8s.kubectl rollout restart deployment authentication
microk8s.kubectl rollout restart deployment gateway
microk8s.kubectl rollout restart deployment content
microk8s.kubectl rollout restart statefulset database-statefulset
microk8s.kubectl apply -f gateway_service.yml
microk8s.kubectl apply -f authentication_service.yml
microk8s.kubectl apply -f content_service.yml