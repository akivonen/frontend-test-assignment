import { useState, useTransition, useEffect } from 'react';
import { Formik, Form } from 'formik';
import TextInput from '@components/common/TextInput/TextInput';
import RadioGroup from '@components/common/RadioGroup/RadioGroup';
import FileInput from '@components/common/FileInput/FileInput';
import { ACCEPTED_IMAGE_TYPES } from '@src/constants/file';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signUpSchema } from '@src/validation/signUpSchema';
import useData from '@src/hooks/useData';
import getToken from '@src/api/token';
import { UserSignUpData, UsersRegistrationResponse } from '@src/types';
import { registerUser } from '@src/api/users';
import { joinErrors } from '@src/lib/utils';
import Preloader from '../../common/Preloader/Preloader';
import SignUpSuccess from '../SignUpSuccess/SignUpSuccess';
import { USERS_COUNT_IN_BLOCK as users_per_block } from '@src/constants/users';

export default function SignUpForm() {
  const {
    positions,
    positionsError,
    isPositionsLoading,
    refetchUsers,
    setVisibleUsersCount,
  } = useData();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (positionsError) {
      setServerError(positionsError);
    }
  }, [positionsError]);

  if (isPositionsLoading || isPending) {
    return <Preloader />;
  }

  if (isSignedUp) {
    return <SignUpSuccess />;
  }

  const initialValues: UserSignUpData = {
    name: '',
    email: '',
    phone: '',
    position_id: positions[0]?.id || null,
    photo: null,
  };

  const onSubmit = async (user: UserSignUpData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        const tokenRes = await getToken();
        if (!tokenRes.success) {
          setServerError('Failed to get token');
          return;
        }
        const response: UsersRegistrationResponse = await registerUser(
          user,
          tokenRes.token
        );
        if (!response.success) {
          const errorMessage = response.fails
            ? joinErrors(response.message, response.fails)
            : response.message;
          setServerError(errorMessage);
          return;
        }
        setIsSignedUp(true);
        refetchUsers();
        setVisibleUsersCount(users_per_block);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Unexpected error occurred trying to register user';
        setServerError(errorMessage);
      }
    });
  };

  return (
    <>
      <h2 className="h1">Working with POST request</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(signUpSchema)}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="sign-up-form">
            {serverError && (
              <div className="sign-up-form__error-message" role="alert">
                <p>{serverError}</p>
              </div>
            )}
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
            {positions.length > 0 ? (
              <RadioGroup name="position_id" options={positions} />
            ) : (
              <p className="sign-up-form__no-positions-message" role="alert">
                No positions available
              </p>
            )}
            <FileInput
              name="photo"
              type="file"
              label="Upload your photo"
              acceptedFormats={ACCEPTED_IMAGE_TYPES}
            />
            <div className="sign-up-form__button-container">
              <button
                type="submit"
                className="button sign-up-form__button"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Sign up'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
