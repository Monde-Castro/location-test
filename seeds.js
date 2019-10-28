const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
    await Post.deleteMany({});
    for(const i of new Array(40)){
        const random1000 = Math.floor(Math.random()* 1000);
        const random5 = Math.floor(Math.random()* 1000);
        const title = faker.lorem.word();
        const description = faker.lorem.text();
        const postData = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            price: random1000,
            avgRating: random5,
            author:'5d839dfee8a59327b8cb1854'
        }
       
    }
    console.log('40 new posts created');
}

module.exports = seedPosts;