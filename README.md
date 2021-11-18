
# Definition

Hiring channel app is a simple app for search for any engineer available

## Features

* CRUD engineer
* CRUD company
* search engineer by name
* search engineer by skill
* sort engineer by name, skill, date updated
* pagination in engineer list
* login with jwt

## Depedencies

Depedencies  | Version
------------- | -------------
body-parser  | 1.19.0
dotenv  | 8.2.0
express  | 4.17.1
express-validator | 6.3.0
jsonwebtoken | 8.5.1
mysql  | 2.17.1


## Route

### company

Method | endpoint
------------- | -------------
get | /company/
post | /company/
put | /company/:id_company
delete | /company/:id_company


### engineer

method | endpoint
------------- | ------------- 
get | /engineer/
post | /engineer/
post | /user/login
put | /engineer/:id_engineer
delete | /engineer/:id_engineer
