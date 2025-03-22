import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      <h1 className='text-6xl font-bold text-[#2563EB]'>403</h1>
      <h2 className='text-2xl font-semibold mt-4'>Unauthorized Access</h2>
      <p className='text-[#4B5563] mt-2 max-w-md'>
        You don't have permission to access this page. Please sign in or contact
        support if you believe this is an error.
      </p>
      <div className='mt-6 space-x-4'>
        <Button
          asChild
          className='bg-[#2563EB] hover:bg-blue-700'
          style={{
            padding: '0.5rem 1rem',
          }}
        >
          <Link to='/'>Go Home</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link to='/login'>Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
