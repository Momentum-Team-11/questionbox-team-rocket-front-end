export const requestLogin = (username, password) => {
  return fakeAjaxLoginRequest(username, password);
};

export const requestReg = (username, password, repassword) => {
  return fakeAjaxRegRequest(username, password, repassword);
};

function fakeAjaxLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    if (username && password) {
      resolve({ auth_token: 'faketoken123456789' });
    }
    reject(new Error('Authentication failed! 😇'));
  });
}

function fakeAjaxRegRequest(username, password, repassword) {
  return new Promise((resolve, reject) => {
    if (username && password && repassword) {
      resolve({ auth_token: 'faketoken123456789' });
    }
    reject(new Error('Registration failed! 🧐'));
  });
}
