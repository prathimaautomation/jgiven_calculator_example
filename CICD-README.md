# Setting up of Calculator Test CICD Pipeline
-	Create a Repo on  Github with main and dev branches for CI:
`a project repository has been created with two branches(main & dev) on github`

[project repo on github](https://github.com/prathimaautomation/jgiven_calculator_example)

-	Push the zip file's code to the repo: 
 `a project directory is created on local machine with the code from the zip file for Calculator Test and pushed to the github repo`

-	Create a Job In Jenkins (Jenkins running on AWS) to trigger job on every commit/push from Dev branch:
 `created a jenkins job "prathima-test" to test the dev branch as soon as code is pushed and to trigger the next jenkins job "prathima-merge" if the tests pass`
```prathima-test
GitHub project: `https://github.com/prathimaautomation/jgiven_calculator_example.git` (enter HTTP url from gitHUB project repo)
Source Code Management: select `Git`, Repository URL: git@github.com:prathimaautomation/jgiven_calculator_example.git (SSH URL from github repository)
Credentials: `prathima-project1` (private ssh key) - a new ssh keypair has been generated for this project
Branches to build: Branch Specifier: */dev
Build Triggers: select `GitHub hook trigger for GITScm polling`
Build: Invoke Gradle script: Use Gradle Wrapper:
              Make gradlew executable: [tick]
              Tasks: test
              
Post-build Acttions: Build other projects: Projects to build: `prathima-merge` and select `Trigger only if build is stable`
Click on Apply and Save
```
-	Create a second job in Jenkins to merge the code to main and tigger and send notification email to our group: 
`created a jenkins job "prathima-merge" to merge the dev branch into the main branch as soon as all the tests passed and send an Email notification`
```prathima-merge
GitHub project: `https://github.com/prathimaautomation/jgiven_calculator_example.git` (enter HTTP url from gitHUB project repo)
Source Code Management: select `Git`, Repository URL: git@github.com:prathimaautomation/jgiven_calculator_example.git (SSH URL from github repository)
Credentials: `prathima-project1` (private ssh key)
Branches to build: Branch Specifier: */dev
Additional Behaviours: Nameof repository: origin
                       Branch to merge to: main
                       Merge strategy: default
                       Fast-forward mode: --ff
Build Triggers: select `GitHub hook trigger for GITScm polling`

Build: Execute shell: Command:
              git checkout main
              git merge origin/dev
        
Post-build Actions: 
Git Publisher: select `Merge Results` 

Editable Email Notification: Recipient List: PJoginipelly@spartaglobal.com
Click on Apply and Save
```
- Create a third job in Jenkins to build a Docker Image and push it to your Docker Hub account, create a webhook on Docker Hub that would send the notification email every time new image is pushed to Docker Hub
- first step: we have to create a Dockerfile to build an image
```Dockerfile
FROM openjdk:12-jdk-alpine
COPY * /app/
```
- second step: create a new webhook on Dockerhub for this image `jgiven_calculator` and add an email notification to send as soon as there is a new docker image is pushed

- third step: created a jenkins job "prathima-DImage" to build a docker image from the gitHub project repo and push the docker image onto the dockerHub`
```prathima-DImage
GitHub project: `https://github.com/prathimaautomation/jgiven_calculator_example.git` (enter HTTP url from gitHUB project repo)
Source Code Management: select `Git`, Repository URL: git@github.com:prathimaautomation/jgiven_calculator_example.git (SSH URL from github repository)
Credentials: `prathima-project1` (private ssh key)
Branches to build: Branch Specifier: */main
Build Triggers: select `GitHub hook trigger for GITScm polling` - this is optional

Build: Execute shell: Command:
              sudo docker build . -t pjoginipelly/jgiven_calculator
       
       Docker Build and Publish:
              Repository Name: pjoginipelly/jgiven_calculator
              Docker Host URI: unix:///var/run/docker.sock
              Registry credentials: pjoginipelly/***** (Dockerhub username & password added)
Click on Apply and Save
```