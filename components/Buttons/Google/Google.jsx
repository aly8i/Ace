import { signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
const Google = () => {
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <div onClick={handleGoogleSignIn}>
      <GoogleIcon/>
    </div>
  );
};

export default Google;