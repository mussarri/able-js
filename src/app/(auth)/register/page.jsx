// project-imports
import { cookies } from 'next/headers';
import Register from 'views/authentication/Register';

// ================================|| REGISTER ||================================ //

export default async function RegisterPage() {
  return <Register />;
}
