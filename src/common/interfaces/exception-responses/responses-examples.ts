const BadRequest = { error: 'Bad Request', statusCode: 400 };

export const BadRequestExample = {
  invalidEmail: {
    summary: 'Email validation failed',
    value: {
      message: ['email must be an email'],
      ...BadRequest,
    },
  },
  missingUsername: {
    summary: 'Missing username',
    value: {
      message: 'Missing required field: username',
      ...BadRequest,
    },
  },

  nofieldsToUpdate: {
    summary: 'No fields provided to update',
    value: {
      message: 'No fields provided to update',
      ...BadRequest,
    },
  },
  passwordTooShort: {
    summary: 'Password too short',
    value: {
      message: ['password must be longer than or equal to 8 characters'],
      ...BadRequest,
    },
  },
  idMustBeNumber: {
    summary: 'ID must be a number',
    value: {
      message: 'Id must be a number',
      ...BadRequest,
    },
  },
};

export const NotFoundResponse = {
  userNotFound: {
    summary: 'No user with that id found',
    value: {
      message: 'User with id 442 not found',
      error: 'Not Found',
      statusCode: 404,
    },
  },
};

export const ConflictResponse = {
  sameEmail: {
    summary: 'No user can have the same email',
    value: {
      message: 'Email already exists',
      error: 'Conflict',
      statusCode: 409,
    },
  },
};

export const UnauthorizedResponse = {
  invalidToken: {
    summary: 'Invalid token',
    value: {
      message: 'Invalid token',
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
  invalidOldPassword: {
    summary: 'Invalid old password',
    value: {
      message: 'Invalid old password',
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
};
