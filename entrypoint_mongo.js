config = {
    _id: "reviewsSet",
    members: [
        {
            _id: 0,
            host: "mongodb:27017",
        },
        {
            _id: 1,
            host: "mongodb2:27017",
        },
        {
            _id: 2,
            host: "mongodb3:27017",
        },
    ]
};

rs.initiate(config);
rs.status();
