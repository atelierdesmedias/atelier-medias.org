     
## Admin back-office on admwp.sql

- user: ADM
- pass: root

## Staging
- url: [staging.atelier-medias.org](http://staging.atelier-medias.org)
- branch: `staging`

Use deployer script to push master on staging: 
```shell
$ ./scripts/push-master-to-staging.sh
```

## Production  
- url: [atelier-medias.org](http://atelier-medias.org) 
- branch: `production`

Use deployer script to push master on production: 
```shell
$ ./scripts/push-master-to-production.sh
```
