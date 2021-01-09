export const logoutRequest = (): Promise<boolean> => {
	localStorage.removeItem('recipe_app_user')
	return Promise.resolve(true)
}
