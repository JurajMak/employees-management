import { router } from '@/routes';
import { Service } from '@/service';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

const Providers: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={Service.client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Providers;
