
clean:
	docker-compose rm --force

up: clean
	docker-compose up --force-recreate --remove-orphans

ping:
	curl http://0.0.0.0:50125?message=ping

pongcert:
	openssl req -x509 -nodes -newkey rsa:2048 -days 3650 -subj '/CN=pong' -keyout pong.pem -out pong.pem
	chmod 600 pong.pem

mitmcert:
	openssl req -x509 -nodes -newkey rsa:2048 -days 3650 -subj '/CN=mitm' -keyout mitm.pem -out mitm.pem
	chmod 600 mitm.pem
