
# atelier-medias.org
 
![Travis (.org) branch](https://img.shields.io/travis/atelierdesmedias/atelier-medias.org/staging.svg?label=build%20staging)
![Travis (.org) branch](https://img.shields.io/travis/atelierdesmedias/atelier-medias.org/production.svg?label=build%20production)

## About
Wordpress website v.2 [atelier-medias.org](http://www.atelier-medias.org/).

## Todo list
Check [github board](https://github.com/atelierdesmedias/atelier-medias.org/projects/1).

## Docs
Check [docs](docs/) folder.

## Design
Check [design online](https://projects.invisionapp.com/share/FMGJ96E57TB#/screens/287421915_Desktop_HD_-_Home)
     
## Admin back-office on admwp.sql

- user: ADM
- pass: root

## Staging
- url: [staging.atelier-medias.org](http://staging.atelier-medias.org)
- branch: `staging`

Use deployer script to push master on staging: 
```shell
$ ./push-master-to-staging.sh
```

## Production  
- url: [atelier-medias.org](http://atelier-medias.org) 
- branch: `production`

Use deployer script to push master on production: 
```shell
$ ./push-master-to-production.sh
```
             
## Credits
Inspired Framework of [fuse-base](https://github.com/solid-js/fuse-base).  
Project dev by ADM developer team.

## Licence
This code is under GPLv3.
