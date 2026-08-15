# Qubicle 

![Banner](./docs/banner.png)

## Overview:

**Qubicle is a Project Progress Tracker webapp.**
It can manage your project progress by showing the different task on the basis of thier status.
Teammates can communicate with the help of comments on the particular issue they are having in a project.  A project cna have multiple issues and the issues cna have multiple people resolving that one issue so it is keeps track of all suggestions in the form of comments people have made while exploring the "STATUS TABLE" **(Kanban Board)**

<p align="center">
  <a href="https://youtu.be/RQ6newzeouY">
    <img src="https://img.youtube.com/vi/RQ6newzeouY/maxresdefault.jpg" width="700">
  </a>
</p>

## Motivation

Many small businesses do not have nay co-ordination platform Huge organization have many paid solutions. But for a startup it is not good to invest on such a tool whcih is a extra monitory headache on thier poclets.  So for solving that problem here we have ***Qubicle*** .  Small startups can deploy it on any small system on thier own premises and have their all projects got orgaized at one place.  It can be used as a task board where all teams can list there task and track if any got done or remaining.

## Tech Stack

- **Backend:  Python(Django-Rest-Framework) **
- **Frontend:  JavaScript(React.js) **
- **Database:  SQL(Postgres) **
- **Search:  ELK(Elasticsearch, Kibana) **
- **Container:  Docker **


## Folder Structure

```text
qubicle
|
|- backend/        # backend services 
|- frontend/       # frontend react UI 
|- .env            # make this file by copying .env.example
|- .gitignore      # can verify what all files needed in this folder
|- docker-compose.yaml    # Container for elasticsearch, kibana and other if needed
|- README.md
```

## Local Setup

```bash
git clone https://github.com/hariom2809/qubicle.git
```

### For Frontend and Backend setup explore thier respective REAME files

### ⚠️ After setting up backend and frontend run this command otherwise you will get unexpected erross and make docker desktop is installed in your system if using MacOs | Windows and docker for Linux
```bash
docker-compose up -d
```

The docker compose will run the all container at once and it will need some configuration at your system too.  If you wnat you cna also add the postgres sql in the compose file and run it too with the all other containers i have the postgres installed on my system so I hvant run it in compose file .

## Author/Maintainer

**Hariom**

- Email: hariomgupta2809@gmail.com
- Linkedin: https://www.linkedin.com/in/hariom2809/