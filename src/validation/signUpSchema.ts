import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@src/constants/file';
import { getImageDimensions } from '@src/lib/utils';

const rfc2822EmailRegex =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
/*
  RFC2822 is backward compatible with z.string().email() native method
 (RFC5322), but RFC2822 is used to exactly meet the requirements
 */
const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'The name must be at least 2 characters')
    .max(60, 'The name must be at most 60 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .regex(rfc2822EmailRegex, 'The email must be a valid email address'),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .regex(phoneRegex, 'The phone must be a valid phone number'),
  photo: z
    .custom<File>((file) => file instanceof File, 'Photo is required')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'The photo format must be jpeg/jpg type'
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'The photo size must not be greater than 5 Mb'
    )
    // image dimensions validation min 70px x 70px as in API docs
    .refine(async (file) => {
      try {
        const { width, height } = await getImageDimensions(file);
        return width >= 70 && height >= 70;
      } catch {
        return false;
      }
    }, 'Minimum size of photo 70x70px'),
});
