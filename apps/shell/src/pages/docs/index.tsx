import dynamic from 'next/dynamic';

const DocsPage = dynamic(() => import('@docs/pages/docs'), {
    ssr: true
  });

export default DocsPage;