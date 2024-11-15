import dynamic from 'next/dynamic';

const ResumeForm = dynamic(() => import('./Component/ResumeForm'));

// const ResumeForm = dynamic(() => import('./Component/ResumeStrucher'), { ssr: false });

export default function Home() {
  return (
    <div>
      <ResumeForm />
    </div>
  );
}
