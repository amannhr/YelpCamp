// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');;
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({accessToken : mapBoxToken});

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '636875fdcbd98d80ed45f238',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry : {
                type : 'Point',
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dx8jdyxk5/image/upload/v1668049837/YelpCamp/dygcs3gdx80i5kq69oxx.jpg',
                    filename: 'YelpCamp/dygcs3gdx80i5kq69oxx',
                },
                {
                    url: 'https://res.cloudinary.com/dx8jdyxk5/image/upload/v1667907867/YelpCamp/rky85prf8nezm7nobl2f.jpg',
                    filename: 'YelpCamp/rky85prf8nezm7nobl2f',

                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo unde iste qui sed quo, perferendis saepe laudantium eum assumenda pariatur possimus voluptatum quos debitis. Iusto eum soluta quibusdam asperiores ratione!',
            price: price
        });
        // const geoData = await geocoder
        //     .forwardGeocode({
        //         query : camp.location,
        //         limit : 1
        //     })
        //     .send();
        // camp.geometry.coordinates = geoData.body.features[0].geometry.coordinates;
        await camp.save();
        // console.log('Seeding Complete!');
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});