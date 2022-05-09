# marketplace-api

Créer la bd postgresql

sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo -su postgres
psql
\l pour afficher la liste des bases de données
\du pour afficher la liste des roles
create user jim with password 'monpassword'; pour créer le rôle jim avec le password monpassword 

Donc j'ai créé un user avec mon username de kali puis mis le mot de passe de ma session kali
CREATE DATABASE ahidb OWNER h4ck3r;
\l pour afficher les bd et on trouve ma bd .

Installer nestjs

sudo npm i -g @nestjs/cli 

Régler le probleme de yarn qui met 00h00m00s 0/0: : ERROR:

sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update 
sudo apt-get install yarn 



https://connect.ed-diamond.com/GNU-Linux-Magazine/GLMFHS-044/Creer-une-base-avec-PostgreSQL


les services sont les cas d'utilisation 