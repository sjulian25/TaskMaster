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

# Set the hostname inside the container
RUN echo "localhost" > /etc/hostname

# Update /etc/hosts to map localhost
RUN echo "127.0.0.1 localhost" >> /etc/hosts

# Set up the MySQL database, user, and password
RUN /usr/bin/mysql_install_db --user=mysql --datadir=/var/lib/mysql && \
    mysqld_safe --datadir='/var/lib/mysql' & \
    sleep 10 && \
    mysql -e "CREATE DATABASE IF NOT EXISTS taskmaster;" && \
    mysql -e "CREATE USER 'root'@'%' IDENTIFIED BY 'rootpass';" && \
    mysql -e "GRANT ALL PRIVILEGES ON taskmaster.* TO 'root'@'%';" && \
    mysql -e "FLUSH PRIVILEGES;" && \
    pkill mysqld

RUN pwd

EXPOSE 8000

CMD /usr/bin/mysqld_safe --datadir='/var/lib/mysql' & \
    python taskmaster/manage.py runserver 0.0.0.0:8000