import { validateAuthToken, createAuthToken, destroyAuthToken } from './jwt.js';
import { environmentVariablesConfig } from '../../config/appConfig.js';
import { authValidations } from '../auth/authValidations.js';
import { ENVIRONMENT } from '../../config/environment.js';
import { logger } from '../../helpers/logger.js';
import { models } from '../../data/models/index.js';

/**
 * Context function from Apollo Server
 */
export const setContext = async ({ req }) => {
	let token = req.headers['authorization'];
	const context = {
		di: {
			model: {
				...models
			},
			authValidation: {
				...authValidations
			},
			jwt: {
				createAuthToken: createAuthToken,
				validateAuthToken: validateAuthToken,
				destroyAuthToken: destroyAuthToken
			},
			suppliedToken: token && (token.startsWith('Bearer ') ? token.slice(7, token.length) : token)
		}
	};



	if (token && typeof token === 'string') {
		try {
			const user = await validateAuthToken(context.di.suppliedToken);
			context.user = user; // Add to Apollo Server context the user who is doing the request if auth token is provided and it's a valid token
		} catch (error) {
			if (environmentVariablesConfig.environment !== ENVIRONMENT.PRODUCTION) {
				logger.debug(error.message);
			}
		}
	}

	return context;
};
