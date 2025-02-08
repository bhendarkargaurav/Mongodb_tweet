import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        console.log(data);
        const content = data.content;
    
        // Extract hashtags safely
        const tags = content.match(/#[a-zA-Z0-9_]+/g)?.map(tag => tag.substring(1).toLowerCase()) || [];
    
        // Create a tweet
        const tweet = await this.tweetRepository.create(data);
    
        if (tags.length === 0) return tweet; // No hashtags, return tweet immediately
    
        // Fetch existing tags
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tag => tag.title);
    
        // Find new tags that are not in the database
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag))
                          .map(tag => ({ title: tag, tweets: [tweet.id] }));
    
        // Bulk insert new hashtags only if they exist
        if (newTags.length > 0) {
            await this.hashtagRepository.bulkCreate(newTags);
        }
    
        // Update existing hashtags to include the new tweet
        await Promise.all(alreadyPresentTags.map(async (tag) => {
            tag.tweets.push(tweet.id);
            await tag.save(); // Ensure `save()` is awaited
        }));
    
        return tweet;
    }
    

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;

/*
    this is my #first #tweet . I am really #excited
*/