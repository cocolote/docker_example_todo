# docker_example_todo
a docker example with a MEAN stack app

### Setup

Start downloading the mongo image

`docker_example_todo$ docker pull mongo`

Then build the image with the todoapp in it.

`docker_example_todo$ docker build -t cah/todoapp .`

We have now two images
    1. Mongo DB runs in its own container. This is best practice so we keep the
    DB separated from the application environment.

    2. Todo api. A simpe node API that allows you query todo lists with tasks
    to complete.

To start using the application we have to start the containers.
First start with mongo

`docker_example_todo$ docker run --name my-mongo -d mongo`

`name`: Assign a name to the container.
`-d`: Run container in deamond (background) mode
