export const userValidation = {
    name: {
        isLength: {
            options: {
                min : 2,
                max: 100,
            },
            errorMessage: 'Name min length is 2 and  max length is 100',
        },
        notEmpty: {
            errorMessage: 'Name cannot be empty',
        },
        isString: {
            errorMessage: 'Name must be a string!',
        },
    },
    password: {
        isLength: {
            options: {
                min: 8
            },
            errorMessage: 'Password min length is 8',
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty',
        }
    }
};

export const filterUser = {
    filter: {
      optional: true,
      isString: {
        errorMessage: 'Filter must be a string',
      },
      isIn: {
        options: [["name"]],
        errorMessage: 'Filter must be one of: name',
      },
    },
    value: {
      optional: true,
      isString: {
        errorMessage: 'Value must be a string',
      },
    },
  };
  