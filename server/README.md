# REST API my_cv

## Requirement
`.env` is a file containing the environment variable **ATLAS_URI**
```sh
ATLAS_URI=mongodb://localhost:27017/profiles?retryWrites=true&w=majority
```

## Install
    npm install

## Run the app
    npm start

# REST API
The REST API to my_cv app is described below.

## Requests

### Get list of Resumes
`GET /resumes`

    curl --location 'localhost:3000/resumes'

### Get a specific Resume
`GET /resumes/:id`

    curl --location 'localhost:3000/resumes/1'

### Create a new Resume
`POST /resumes`
```sh
curl --location 'localhost:3000/resumes' \
--header 'Content-Type: application/json' \
--data-raw '{
    "contact": {
        "phone": "01 23 45 67 89",
        "email": "john.doe@mycv.com",
        "address": "123 Anywhere St., Any City"
    }
}'
```

### Delete a Resume
`DELETE /user/:id`

    curl --location --request DELETE 'localhost:3000/resumes/1'

