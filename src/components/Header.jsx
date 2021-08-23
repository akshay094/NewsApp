import React from 'react'
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';


const Header = () => {
  return (
    <Box component="div" m={3}>
      <Container variant="h1" component="h1" maxWidth="lg" align="center" m={2}>
        NewS
      </Container>
      <Container variant="p" component="p" maxWidth="lg" align="center" m={2}>
        @adfree
      </Container>
    </Box>
  )
}

export default Header
