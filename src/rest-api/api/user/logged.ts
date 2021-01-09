export const loggedRequest = (): Promise<boolean> =>
	!!localStorage.getItem('recipe_app_user')
	? Promise.resolve(true)
	: Promise.reject(false)
