---
title: Walkthrough - Deploy Anything with Nginx
date: "2021-08-30T12:12:03.284Z"
description: Getting Data from an external API
---

## Purpose of this article

This article is meant to be a high-level of guide of setting up a VPS and deploying your web application using Nginx.

## Step 1 - Get a VPS

First step is you need a server you can SSH into. You can create an ubuntu/linux server with any of the following services:

- Amazon Web Services EC2
- Google Cloud Compute
- Azure Cloud
- Linode
- DigitalOcean
- Vultr

Regardless which of the above you use, often times the minimum expense will be around $5/mo for the virtual server. You need to be able to login to server so you need make sure you create it with an SSH key (a key generated by your computer, like a fingerprint identifies that computer when it tries to connect to other servers)

#### How to create an SSH-Key (mac/linux/windows with git-bash)

- cd into the hidden ssh folder `cd ~/.ssh`
- run the ssh-key generator `ssh-keygen`
- accept all the defaults (only don't use the defaults if your creating a second key or know what you are doing)
- this should create two files
  - **id_rsa** this is your private key, this should only be on your computer and never shared.
  - **id_rsa.pub** this is your public key, this is what your share with servers you want to SSH into (like github or your virtual server)
- copy the text of your public key by printing `cat id_rsa.pub` then copying and pasting into the service you are generating your server with

#### How to Login to your server

- in terminal to SSH into your server use the following command `ssh username@ipaddress`
- So if my username was alex and ip address 111.111.111.1 I'd use command `ssh alex@111.111.111.1`
- The server will then present the public key you provided it and if the matching private key is on your computer the login will be successful

If you are logging in as the root user, you should create a different user to avoid security issue that can arise from deploying your app with root privileges.

#### creating a non-root user

- create a new user `adduser testuser`

- add user to sudo group `usermod -aG sudo testuser`

- switch to that user `su - testuser`

#### pointing a domain to your server

- In the DNS records of your domain, create an "a" record the points to the ip address of your virtual private server (VPS)
- The host part of the DNS record specifies a subdomain that is being pointed.

So if I wanted to point subdomain.domain.com to my server running at 111.111.111.11 I'd create...

- DNS record type: a, host: subdomain, points to: 111.111.111.11

## Step 2 - Setting Up The Server

- Installing any software your app needs to run (language, like python or ruby).

- git clone the repo with your app to the server

- run your app development server

For example, if I was deploying a python flask app. I would:

- Install python3

- create an SSH key on my server then add it to my github account

- clone the repo of my app in the home folder

- install dependencies as I normally would after cloning

- run the devserver and test it out in my browser

So if the app runs the dev server on port 5000 I'd then put http://111.111.111.11:5000 in my browser, make sure to use http as we have not yet configured https.

**NOTE** by default the dev server on most langauge's web frameworks default to hosting on 127.0.0.1 or "localhost" which is not publically accessible, you need to change the host 0.0.0.0, read your frameworks documentation on how to change the host.

If you see the right output then the app is running on your server correctly. Next we need to...

- create a service for our app

- use nginx to point requests to our subdomain to that service

- use letsencrypt to add SSL to our site.

## Step 3 - Create a Service for Our App

Essentially a service allows use to define a process that runs our app that doesn't run neccessarily on a IP port. Instead our Nginx Web Server will forward requests to that service.

create a fill in the following location, the name of the service file is the name of the service. To create the file use the command `sudo nano /etc/systemd/system/app.service`

The contents should be, use the comments to know what the contents need to be...

```
[Unit]
#  specifies metadata and dependencies
Description=Service to run my app
After=network.target

# tells the init system to only start this after the networking target has been reached
# We will give our regular user account ownership of the process since it owns all of the relevant files
[Service]

# Service specify the user and group under which our process will run.
User=testuser

# give group ownership to the www-data group so that Nginx can communicate easily with the Gunicorn processes.
Group=www-data

# We'll then map out the working directory and set the PATH environmental variable so that the init system knows where to run the command>
WorkingDirectory=/home/testuser/mygithubrepo

# Define inline ENV VARIABLES here
Environment="ENVIRONMENT=PRODUCTION"
Envrionment="DATABASE_URL=postgres://..."

# We'll then specify the commanded to start the service
ExecStart=node server.js

# This will tell systemd what to link this service to if we enable it to start at boot. We want this service to start when the regular m>

[Install]
WantedBy=multi-user.target
```

- in nano to quit and save first hit `ctrl+x` then hit `y` and `enter`

**NOTE** Make sure you look up how to generate a sock file with your particular language/framework, for example deploying a flask python app, I'd likely use gunicorn to act as a web app so the ExecStart command would look like...

```
# We'll then specify the commanded to start the service
ExecStart=/usr/bin/gunicorn --workers 3 --bind unix:app.sock --access-logfile /home/testuser/mygitrepo/accesslog --error-logfile /home/testuser/mygitrepo/errorlog -m 007 wsgi:app
```

This gunicorn command create an app.sock file and this will allow Nginx to communicate with the service.

#### Start the Service

- then run `sudo systemctl start app`

- then run `sudo systemctl enable app`

\*\*NOTE: double check the service is running with the command `sudo systemctl status app`, if you need to do any trouble shooting to restart the server do a `sudo systemctl daemon-reload` and then start the service again.

## Step 4 - Configuring Nginx

- Install Nginx `sudo apt-get install nginx`

- create configuration file `sudo nano /etc/nginx/sites-available/app`

```
server {
        listen 80;
        server_name subdomain.domain.com;

        location / {
                include proxy_params;
                proxy_pass http://unix:/home/testuser/mygitrepo/app.sock;
        }
}

```

use `pwd` to make sure you have the right file path to the where the directory with run.py is on your machine. Also make sure to replace the domain above with a domain that is pointing to the server.

- run command `sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled`

- restart nginx `sudo systemctl restart nginx`

- set firewall for nginx `sudo ufw allow 'Nginx Full'`

**NOTE** If you don't want to a service and instead just want to run the application locally and forward traffic to it. Imagine I have a express web server running on port 5000 my conf file may look like this instead:

```
server {
        listen 80;
        server_name subdomain.domain.com;

        location / {
                include proxy_params;
                proxy_pass http://127.0.0.1:5000;
        }
}
```

In this case, it's ok your apps server is hosted on 127.0.0.1:5000 cause it's not being accessed externally. Instead external requests will go through port 80 (http) or port 443 (https) to the Nginx server who then redirects it your app based on your conf file.

## Setting Up SSL

- install certbot `sudo apt-get install certbot`

- `apt-get install python3-certbot-nginx`

- run this command swapping the domain to be used with this server `sudo certbot --nginx -d subdomain.domain.com`

YOU DID IT!!!

Articles for Reference

- [NGINX Redirects Reference](https://gist.github.com/soheilhy/8b94347ff8336d971ad0)