import ReactQueryProvider from './components/react-query.provider';

export default function Providers({ children }: ProvidersProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
