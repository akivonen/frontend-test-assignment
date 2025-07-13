import { Formik, Form } from 'formik';
import TextInput from '@components/common/TextInput/TextInput';
import { useEffect, useState } from 'react';
import { Position } from '@src/types';
import getPositions from '@src/api/positions';
import RadioGroup from '../common/RadioGroup/RadioGroup';
import FileInput from '../common/FileInput/FileInput';
import { ACCEPTED_IMAGE_TYPES } from '@src/constants/file';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signUpSchema } from '@src/validation/signUpSchema';

export default function SignUpForm() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const positions = await getPositions();
      setPositions(positions);
    };
    fetchPositions();
  }, []);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    position: 1,
    photo: null,
  };

  return (
    <section className="container sign-up" aria-label="Sign up form">
      <h1>Working with POST request</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(signUpSchema)}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="sign-up__form">
            <TextInput
              type="text"
              name="name"
              label="Your name"
              placeholder="Your name"
            />
            <TextInput
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <TextInput
              type="tel"
              name="phone"
              label="Phone"
              placeholder="Phone"
              phonePrefix="+380"
              maxLength={13}
              hint="+38 (XXX) XXX - XX - XX"
            />
            <RadioGroup name="position" options={positions} />
            <FileInput
              name="photo"
              type="file"
              label="Upload your photo"
              acceptedFormats={ACCEPTED_IMAGE_TYPES}
            />
            <div className="sign-up__form__button-container">
              <button
                type="submit"
                className="button sign-up__form__button"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Sign up'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
