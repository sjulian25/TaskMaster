FROM python:3.12.3-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN  apk update \
	&& apk add --no-cache gcc musl-dev python3-dev libffi-dev py3-mysqlclient pkgconfig mysql-dev mysql mysql-client\
	&& pip install --upgrade pip

COPY ./backend/requirements.txt ./

RUN pip install -r requirements.txt

COPY ./backend ./

RUN ls -al ./taskmaster

RUN pwd

EXPOSE 8000

CMD /usr/bin/mysqld_safe --datadir='/var/lib/mysql' & \
	python taskmaster/manage.py makemigrations & \
	python taskmaster/manage.py migrate & \
    python taskmaster/manage.py runserver 0.0.0.0:8000