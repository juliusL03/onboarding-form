import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  email: string;
  password: string;
};

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  const validatePassword = (value: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return pattern.test(value) || 'Password must meet the criteria.';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First Name Field */}
      <div>
        <label>First Name:</label>
        <input
          type="text"
          {...register('firstName', { maxLength: 100 })}
          placeholder="Enter first name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email address.',
            },
          })}
          placeholder="Enter email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 12, message: 'Password must be at least 12 characters long' },
            validate: validatePassword,
          })}
          placeholder="Enter password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
