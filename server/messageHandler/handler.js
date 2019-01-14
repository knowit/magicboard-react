'use strict';

const AWS = require('aws-sdk');

const BUCKET = 'magicboard-messages';
const KEY = 'message';

const S3 = new AWS.S3({
    s3ForcePathStyle: true,
    region: 'eu-central-1',
});

const getS3Object = () => {
    return S3.getObject({
            Bucket: BUCKET,
            Key: KEY,
        },
        (err) => {
            if (err) console.log(err, err.stack);
        })
        .promise()
        .then(object => JSON.parse(object.Body))
        .catch(error => {
            console.log(error);
        })
};

const putS3Object = (object) => {
    return S3.putObject({
            Body: JSON.stringify(object),
            Bucket: BUCKET,
            Key: KEY,
        },
        (err) => {
            if (err) console.log(err, err.stack);
        })
        .promise();
};

module.exports.put = async (event, context, callback) => {
    await putS3Object(JSON.parse(event.body))
        .then(
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Message received!',
                    object: JSON.parse(event.body),
                }),
            })
        )
};

module.exports.get = async (event, context, callback) => {
    await getS3Object()
        .then(response => {
            console.log(response);
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(response),
            });
        })
};




