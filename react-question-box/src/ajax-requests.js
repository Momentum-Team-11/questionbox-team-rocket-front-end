export const requestLogin = (username, password) => {
  return fakeAjaxLoginRequest(username, password);
};

function fakeAjaxLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    if (username && password) {
      resolve({ auth_token: 'faketoken123456789' });
    }
    reject(new Error('Authentication failed! 😇'));
  });
}
