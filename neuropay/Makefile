install:
	python -m venv venv && ./venv/bin/pip install -r requirements.txt
run:
	./venv/bin/python dev.py

docker-bash:
	docker compose run --rm app bash -c "source ./venv/bin/activate && exec bash"

docker-install:
	docker compose run --rm app make install

docker-run:
	docker compose run --rm --service-ports app make run
