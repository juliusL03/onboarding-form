import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  password: string;
  confirmPassword: string;
};

const MatchPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>();

  const validatePasswordMatch = (value: string, otherValue: string) => {
    return value === otherValue || 'Passwords do not match';
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Password Field */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          placeholder="Enter password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => validatePasswordMatch(value, watch('password')),
          })}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MatchPassword
