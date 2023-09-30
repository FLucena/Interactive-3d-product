'use strict';
import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import * as contentEn from './content-en';
import * as contentEs from './content-es';



export default function Navbar({ lang }) {
  const content = lang === 'en' ? contentEn : contentEs;

  

  return (
    <React.Fragment>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w="100%">
        <Flex
          h={20}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <HStack
            spacing={8}
            alignItems="center"
            justifyContent="flex-start"
            w="full"
          >
            <Box fontSize={[18, 30, 40]} w={[150, 280, 400]}>
              FL Automations
            </Box>
            <HStack
              as="nav"
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
            </HStack>
          </HStack>
          <Flex alignItems="center">
              <>
                <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                </MenuButton>
              </Menu>
              </>
            
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                </MenuButton>
              </Menu>
            </Flex>
          
          </Flex>
        </Box>
    </React.Fragment>
  );
}