export const todoValidation = {
    title: {
        isLength: {
            options: {
                min : 5,
                max: 30,
            },
            errorMessage: 'Title min length: 5 \nTitle max length:30',
        },
        notEmpty: {
            errorMessage: 'Title cannot be empty',
        },
        isString: {
            errorMessage: 'Title must be a string!',
        },
    },
    description: {
        isLength: {
            options: {
                max: 120,
            },
            errorMessage: 'Description max length:120',
        },
    },
    status: {
        notEmpty: {
            errorMessage: 'Title cannot be empty',
        },
        isString: {
            errorMessage: 'Title must be a string!',
        },
        isIn: {
            options: [["Not started", "In process", "Done"]],
            errorMessage: 'Status must be one of: Not started, In process, Done',
        },
    },
    user: {
        notEmpty: {
            errorMessage: 'Title cannot be empty',
        },
        isString: {
            errorMessage: 'Title must be a string!',
        },
    }
};

export const filterTodo = {
    filter: {
      optional: true,
      isString: {
        errorMessage: 'Filter must be a string',
      },
      isIn: {
        options: [["title", "description", "status", "user"]],
        errorMessage: 'Filter must be one of: title, description, status, user',
      },
    },
    value: {
      optional: true,
      isString: {
        errorMessage: 'Value must be a string',
      },
    },
  };
  