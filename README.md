# marketplace-api

Pour télécharger et installer Postman
  https://www.postman.com/downloads/
  tar -xzf Postman-linux-x64-7.32.0.tar.gz
  sudo mkdir -p /opt/apps/
  sudo mv Postman /opt/apps/
  sudo ln -s /opt/apps/Postman/Postman /usr/local/bin/postman
  postman

Pour avoir Postman en tant qu'appli desktop 
  sudo gedit /usr/share/applications/postman.desktop
  ![Copier_cec_dans_le_gedit](/home/h4ck3r/Images/1.png "ok")
      [Desktop Entry]
      Type=Application
      Name=Postman
      Icon=/opt/apps/Postman/app/resources/app/assets/icon.png
      Exec="/opt/apps/Postman/Postman"
      Comment=Postman Desktop App
      Categories=Development;Code;
      
  Puis on peut lancer le postman comme un logiciel directement sans terminal

Installer Pgadmin4

1- sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo   apt-key add

2- sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/bullseye pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

3- sudo apt install pgadmin4

4- sudo /usr/pgadmin4/bin/setup-web.sh  et c'est tout


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



Modifications dans :
create-product.dto.ts

Comment taffer 
    
    Aller dans src puis faire nest generate module modules/'nomdelatable' puis le module se crée dans le dossier portant son nom avec la syntaxe 'nomdelatable'.module.ts

    Faire nest generate controller modules/'nomdelatable' puis le controller se crée avec la syntaxe 'nomdumodule'.controller.ts et un fichier 'nomdelatable'.spec.ts (ce fichier ci c'est pour les test unitaires mais nous n'allons pas utiliser ca)

    Faire nest generate service modules/'nomdelatable' pour créer le fichier 'nomdumodule'.service.spec.ts (pour les test unitaires) puis le fichier 'nomdumodule'.service.ts

    Faire touch /modules/'nomdumodule'/'nomdumodule'.entity.ts pour créer l'entité.

    Creér maintenant le dossier dto puis créer à l'intérieur les fichier 'nomdumodule'.dto.ts puis create-'nomdumodule'.dto.ts .


    Aller maintenant dans entity créer l'entité genre les caractéristiques de la table. Puis ensuite dans les fichiers .dto et mettre ce qu'il faut mettre ensuite dans module puis dans service . C'est dans service qu'on défini les fonctionnalités .
    Puis finalement dans controller oû on définit les routes et autres.



Informations
  (options : S = affiche les objets systèmes, + = informations supplémentaires)
  \d[S+]               affiche la liste des tables, vues et séquences
  \d[S+] NOM           affiche la description de la table, de la vue,
                       de la séquence ou de l'index

Pour installer nodemon:
  Créer un fichier nodemon.json puis un fichier nodemon-debug.json
  Aller sur ce lien https://gist.github.com/sravan464/609a8c58e746d5391922c11f6a0b3381 puis copier ce qu'il y a dans chaque partie dans les fichiers respectifs

  venir dans le terminal du taff et faire yarn install(juste pour voir, sinon c'est pas important)
  Puis pour finir, npm install -g nodemon 
  et c'est tout