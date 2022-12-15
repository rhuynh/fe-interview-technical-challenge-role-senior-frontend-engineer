import { PropsWithChildren } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import { Box } from '@mui/material';
import links from '../../constants/links';
import InstructionsBar from '../InstructionsBar';

type TLayout = PropsWithChildren<{
  onFooterClick: () => void;
}>;

function Layout({ children, onFooterClick }: TLayout) {
  return (
    <>
      {/* Exercise 4.  Opted to go w/ flexbox for sticky footer as it's a more robust solution (works w/ variable footer height).  the implementation is more complicated than if we were to just use min-height: calc(100vh-252px) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box
          component="main"
          sx={{
            display: 'flex',
            flex: '1 0 auto'
          }}
        >
          <NavBar links={links} />
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: '750px',
              padding: '48px 16px',
            }}
          >
            {children}
            <InstructionsBar onClick={onFooterClick} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
