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

Use deployer script to push staging on production: 
```shell
$ ./scripts/push-staging-to-production.sh
```
