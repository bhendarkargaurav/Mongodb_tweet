import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substring(1))
                        .map(tag => tag.toLowerCase());
        const tweet = await this.tweetRepository.create(data);
        let alreadyPressentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPressentTags =  alreadyPressentTags.map(tags => tags.title);
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

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService; 