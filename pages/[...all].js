import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: true,
});

export default function Index() {
  return <App />;
}
