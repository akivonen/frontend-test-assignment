import SignedUpImage from '@assets/images/success-image.svg';

export default function SignUpSuccess() {
  return (
    <>
      <h2 className="h1">User successfully registered</h2>
      <SignedUpImage
        className="success-image"
        role="img"
        aria-label="User successfully registered"
      />
    </>
  );
}
