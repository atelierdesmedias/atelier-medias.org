
# atelier-medias.org
 
![Travis (.org) branch](https://img.shields.io/travis/atelierdesmedias/atelier-medias.org/staging.svg?label=build%20staging)
![Travis (.org) branch](https://img.shields.io/travis/atelierdesmedias/atelier-medias.org/production.svg?label=build%20production)

## About

[atelier-medias.org](https://atelier-medias.org/) is V2 website of the "Atelier Des Médias" @ Lyon FR.

#### Backend

- [Grav CMS](https://getgrav.org/)
 
#### Frontend 
    
- [Twig](https://twig.symfony.com/) PHP templating 
- [SASS](https://sass-lang.com/)
- Vanilla javascript

## Requirments

- PHP >= 7.2
- [composer](https://getcomposer.org)
- [nodejs](https://nodejs.org)
- [npm](https://npmjs.com) 

## Installation

- Clone the repos and move to the repos new folder 

 ```shell
$ git clone https://github.com/atelierdesmedias/atelier-medias.org.git && cd atelier-medias.org
 ```
 
- Install npm and composer dependencies 

```shell
$ npm i && ./composer-install.sh
``` 

- In `.env` file, set your own `BASE_URL`
    
- Start dev server
 
```shell
$ npm run dev
```
   
Application in dev mode should be available on `http://localhost:1234`.

## Admin

Grav admin access: 
url: `http://localhost:1234/admin`

## More informations
Check the [FR docs](docs/).

## Credits  
Project dev by [Willy Brauner](http://willybrauner.com) and ADM developer team.

## Licence
MIT
