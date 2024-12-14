FROM python:3.12.3-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN  apk update \
	&& apk add --no-cache gcc musl-dev python3-dev libffi-dev py3-mysqlclient pkgconfig mysql-dev\
	&& pip install --upgrade pip

COPY ./backend/requirements.txt ./

RUN pip install -r requirements.txt

COPY ./backend ./

RUN ls -al ./taskmaster
RUN pwd

EXPOSE 8000

CMD ["python3", "taskmaster/manage.py", "runserver"]