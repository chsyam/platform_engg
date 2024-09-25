import '../styles/global.css';
import { CookiesProvider } from 'react-cookie';
import { WebsocketProvider } from '../components/ui/Layout/WebSocket/WebsocketProvider';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <WebsocketProvider>
        <Component {...pageProps} />
      </WebsocketProvider>
    </CookiesProvider>
  );
}