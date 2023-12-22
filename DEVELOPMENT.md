# Development Guide

A Docker Compose development setup is available, based around the [bitnami/opencart](https://hub.docker.com/r/bitnami/opencart) image.

## Starting Up

First, you need to start the docker containers:

```shell
docker compose up -d
```

You can now view OpenCart on http://localhost, and the admin portal can be found on http://localhost/admin.

Default credentials:

- Username: `admin`
- Password: `parcelpro1`

## Installing the Module

First, you need to copy the module files into the container.
This can be done automatically by running `./copy-module.sh`.

Next, you need to generate the `install.ocmod.zip` file.
This can be done by running the `./build.sh` script.
Open the OpenCart admin panel and go to "Extensions" -> "Installer",
here you need to upload this zip file.

Next, under "Extensions" -> "Modifications", you should see "Parcel Pro" in the list.
Click the "Refresh" button in the top-right to rebuild the modification cache.

Finally, under "Extensions" -> "Extensions", if you set "Modules" as the extension type, you should see a "Parcel Pro" extension in the list.
From here you can enable it, and change the settings.

## CLI in Docker

To get a shell in the running OpenCart container, run `./cli.sh`.

## Shutting Down

Stop the containers, but keep their data:

```shell
docker compose stop
```

Stop and remove the containers and volumes:

```shell
docker compose down -v
```
