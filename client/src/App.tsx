import Router from './router';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/auth.context';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4361ee',
            borderRadius: 6,
          },
        }}
      >
        <GlobalStyle />
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
