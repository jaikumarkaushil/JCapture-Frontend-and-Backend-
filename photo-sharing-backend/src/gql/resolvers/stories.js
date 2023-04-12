import users from './users.js';

export default {
  Query: {
    getStories: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const user = await context.di.authValidation.getUser(context);
      const userId = user._id
      const followers = await context.di.model.Follows.find({ idFollower: userId }).populate("idUser").lean();
      const stories = [];
      followers.forEach(async follower => {
        const result = await users.Query.getUser("", { id: follower.idUser._id }, context);
        stories.push(result);
      });
      return stories;
    }
  }
};
