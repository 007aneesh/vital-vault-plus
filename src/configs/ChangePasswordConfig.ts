import { z } from 'zod'

export const change_password_schema = z
  .object({
    current_password: z
      .string()
      .min(8, 'Current password must be at least 8 characters'),
    new_password: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'New password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'New password must contain at least one special character',
      ),
    confirm_new_password: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Passwords do not match',
    path: ['confirm_new_password'],
  })


export const change_password_form_config = {
  title: 'Change Password',
  fields: [
    {
      name: 'current_password',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter your current password',
    },
    {
      name: 'new_password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter a new password',
    },
    {
      name: 'confirm_new_password',
      label: 'Confirm New Password',
      type: 'password',
      placeholder: 'Confirm New Password',
    },
  ],
}
