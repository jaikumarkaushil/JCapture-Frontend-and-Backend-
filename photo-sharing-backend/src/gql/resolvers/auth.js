import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import { isValidEmail, isStrongPassword } from '../../helpers/validations.js';
import convertToBase64 from '../../shared/convertToBase64.js';

/**
 * All resolvers related to auth
 * @typedef {Object}
 */
export default {
	Query: {
	},
	Mutation: {
		/**
		 * It allows to users to register as long as the limit of allowed users has not been reached
		 */
		registerUser: async (parent, { email, password, fullName, userName }, context) => {
			if (!email || !password) {
				throw new UserInputError('Data provided is not valid');
			}

			if (!isValidEmail(email)) {
				throw new UserInputError('The email is not valid. Enter email with this format: email@example.com ');
			}

			if (!isStrongPassword(password)) {
				throw new UserInputError('The password is not secure enough. Enter password with at least 8 characters. It must contain numbers, lowercase letters and uppercase letters. The spaces are not allowed. This characters are not allowed: { } ( ) | ~ € ¿ ¬');
			}

			const registeredUsersCount = await context.di.model.Users.find().estimatedDocumentCount();

			context.di.authValidation.ensureLimitOfUsersIsNotReached(registeredUsersCount);

			const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({ email }).lean();

			if (isAnEmailAlreadyRegistered) {
				throw new UserInputError('Data provided is not valid');
			}

			let profileImage = "images/profile/blank-profile.png"

			await new context.di.model.Users({ email, password, fullName, userName, profileImage, bio: "", website: "" }).save();

			const user = await context.di.model.Users.findOne({ email }).lean();
			return {
				token: context.di.jwt.createAuthToken(user.email, user.userName, user.isActive, user._id)
			};
		},
		/**
		 * It allows users to authenticate. Users with property isActive with value false are not allowed to authenticate. When an user authenticates the value of lastLogin will be updated
		 */
		authUser: async (parent, { email, password }, context) => {
			if (!email || !password) {
				throw new UserInputError('Invalid credentials');
			}

			const user = await context.di.model.Users.findOne({ email }).lean();

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			const isCorrectPassword = await bcrypt.compare(password, user.password);

			if (!isCorrectPassword) {
				throw new UserInputError('Invalid credentials');
			}
			delete user.password;
			await context.di.model.Users.findOneAndUpdate({ email }, { lastLogin: new Date().toISOString(), isActive: true }, { new: true }).lean();

			return {
				token: context.di.jwt.createAuthToken(user.email, user.userName, user.isActive, user._id)
			};
		},

		updateUser: async (parent, { userName, fullName, profileImage, bio, website }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const userToUpdate = await context.di.authValidation.getUser(context)
			if (userName) {
				userToUpdate.userName = userName;
			}
			if (fullName) {
				userToUpdate.fullName = fullName;
			}
			if (bio) {
				userToUpdate.bio = bio;
			}
			if (website) {
				userToUpdate.website = website;
			}
			if (profileImage) {
				try {
					base64_encoded = await convertToBase64(profileImage);
					userToUpdate.profileImage = base64_encoded;
				} catch (error) {
					console.log(error)
				}
			}
			userToUpdate.lastLogin = new Date().toISOString();
			userToUpdate.isActive = true;

			const userId = userToUpdate._id;

			await context.di.model.Users.findOneAndUpdate({ _id: userId }, userToUpdate, { new: true }).lean();

			return {
				"message": "User updated successfully",
				"success": true
			};
		},

		logout: async (_, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const userId = context.user.id
			await context.di.model.Users.findOneAndUpdate({ _id: userId }, { isActive: false, lastLogout: Date.now() }, { new: true }).lean();
			return 'Logged out successfully'
		},
		/**
		 * It allows to user to delete their account permanently (this action does not delete the records associated with the user, it only deletes their user account)
		 */
		deleteMyUserAccount: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			const user = await context.di.authValidation.getUser(context);

			return context.di.model.Users.deleteOne({ _id: user.uuid });
		}
	}
};
