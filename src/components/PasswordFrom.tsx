import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  password: string;
};

const PasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const validatePassword = (value: string) => {
    const minLength = value.length >= 12;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    return (
      minLength &&
      hasSpecialChar &&
      hasUppercase &&
      hasLowercase ||
      'Password must have 1 special char, 1 capital 1 and 1 small letter.'
    );
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

export default PasswordForm
