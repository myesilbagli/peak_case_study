import { useState } from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { Layout } from './components/Layout';
import { MainTabs } from './components/MainTabs';
import { Q1Panel } from './pages/Q1Panel';
import { Q2Panel } from './pages/Q2Panel';
import { Q4Panel } from './pages/Q4Panel';

function AppContent() {
  const [activeTab, setActiveTab] = useState('q1');

  return (
    <>
      <MainTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'q1' && <Q1Panel />}
      {activeTab === 'q2' && <Q2Panel />}
      {activeTab === 'q4' && <Q4Panel />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <AppContent />
      </Layout>
    </ThemeProvider>
  );
}
