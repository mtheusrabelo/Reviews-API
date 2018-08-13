FORMAT: 1A
HOST: http://localhost:8888/

# Reviews-API

Open-source Reviews API

## Healthcheck [/healthcheck]

### Get Healthcheck [GET /healthcheck]

+ Response 200 (application/json)

        "UP"

## Ratings [/ratings]

### Get ratings [GET /ratings{?productId}]

+ Parameters
    + productId (string)
        + Members
            + `1444`

+ Response 200 (application/json)

        {
            "_id": "5b70946625315ced5b4cea2c",
            "productId": "1444",
            "__v": 0,
            "count": 18,
            "rating": 99
        }

## Reviews [/reviews]

### Get reviews [GET /reviews{?userId,productId,page,limit}]

+ Parameters
    + userId (string, optional)
        + Members
            + `999`
    + productId (string, optional)
        + Members
            + `2567`
    + page (number, optional)
        + Default: `0`
    + limit (number, optional)
        + Default: `10`
    
+ Response 200 (application/json)

        [
            {
                "_id": "5b708be8bb44d7003cc2a3f5",
                "userId": "1232",
                "productId": "1444",
                "rating": 3,
                "review": "awesome",
                "__v": 0
            },
            {
                "_id": "5b708fe2c1f830022ec61633",
                "userId": "125",
                "productId": "1000",
                "rating": 5,
                "review": "awesome",
                "__v": 0
            },
        ]

### Post review [POST /reviews]

+ Request (application/json)

        {
            "userId": "1232",
            "productId": "1444",
            "rating": 5,
            "review": "awesome"
        }

+ Response 201 (application/json)

    + Headers

            Location: /reviews/5b70af2312f1a5146a14060c

    + Body

            {
                "_id": "5b70aea86bafc1144a865d2c",
                "userId": "1232",
                "productId": "1444",
                "rating": 5,
                "review": "awesome",
                "__v": 0
            }

### Get review by id [GET /reviews/{id}]

+ Parameters
    + id (string)
        + Members
            + `5b70aea86bafc1144a865d2c`

+ Request (application/json)

        {
            "userId": "1232",
            "productId": "1444",
            "rating": 5,
            "review": "awesome"
        }

+ Response 200 (application/json)

    + Body

            {
                "_id": "5b70aea86bafc1144a865d2c",
                "userId": "780",
                "productId": "2005",
                "rating": 4,
                "review": "good",
                "__v": 0
            }

### Delete review by id [DELETE /reviews/{id}]

+ Parameters
    + id (string)
        + Members
            + `5b70aea86bafc1144a865d2c`

+ Response 204 (application/json)

### Update review by id [POST /reviews/{id}]

+ Parameters
    + id (string)
        + Members
            + `5b70aea86bafc1144a865d2c`

+ Request (application/json)

        {
            "rating": 5,
            "review": "good"
        }

+ Response 200 (application/json)


    + Body

            {
                "_id": "5b70aea86bafc1144a865d2c",
                "userId": "1290",
                "productId": "1900",
                "rating": 5,
                "review": "good",
                "__v": 0
            }