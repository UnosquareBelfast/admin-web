export const userLogin = function(email, password) {
  return new Promise((resolve, reject) => {
    if (email == null || password == null) {
      reject('error');
    }
    else {
      resolve();
    }
  });
};
