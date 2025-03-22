import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      <h1 className='text-6xl font-bold text-[#2563EB]'>404</h1>
      <h2 className='text-2xl font-semibold mt-4'>Page Not Found</h2>
      <p className='text-[#4B5563] mt-2 max-w-md'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        className='mt-6 bg-[#2563EB] hover:bg-blue-700'
        asChild
        style={{
          padding: '0.5rem 1rem',
        }}
      >
        <Link to='/'>Go Home</Link>
      </Button>
    </div>
  );
}
