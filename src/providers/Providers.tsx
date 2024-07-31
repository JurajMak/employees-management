import { router } from '@/routes';
import { Service } from '@/service';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Tailwind from 'primereact/passthrough/tailwind';

const Providers: React.FC = () => {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <QueryClientProvider client={Service.client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PrimeReactProvider>
  );
};

export default Providers;
