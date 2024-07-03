const { TweetRepository, HashtagRepository } = require('../repository/index'); 

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9]+/g).map((tag) => tag.substring(1));
        const tweet = await this.tweetRepository.create(data);
        let alreadyPressentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPressentTags = alreadyPressentTags = alreadyPressentTags.map(tags => tags.title);
        let newTags = tags.filter(tag => !titleOfPressentTags.includes(tag));
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPressentTags.forEach((tag) => {
            if (tag) {
                tag.tweets.push(tweet.id);
            } else {
                console.error("Tag is undefined or null");
            }
            // tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;

    }
}

module.exports = TweetService;