import './global.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HttpProvider } from '@evmos-task/common/data-access';

import { TokensRootPage } from './pages/tokens-root.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TokensRootPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HttpProvider>
      <RouterProvider router={router} />
    </HttpProvider>
  </StrictMode>,
);
