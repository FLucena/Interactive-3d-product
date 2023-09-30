import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Helmet } from 'react-helmet';
import { ChakraProvider, Button, Box, Center, Text, Flex, Spacer, VStack, Input } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Footer from './Footer'
import Navbar from './Navbar'

const theme = extendTheme({});

const defaultColors = {
  mesh: "#ffffff",
  stripes: "#ffffff",
  soul: "#ffffff"
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/shoe.gltf')
  return (
    <group ref={group} {...props} dispose={null} scale={3}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} material-color={props.customColors.setStripes}/>
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={props.customColors.mesh}/>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={props.customColors.soul}/>
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner}material-color={props.customColors.soul} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={props.customColors.soul}/>
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes}material-color={props.customColors.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={props.customColors.stripes}/>
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={props.customColors.soul}/>
    </group>
  )
}

function App() {
  const [mesh, setMesh] = useState(getRandomColor());
  const [stripes, setStripes] = useState(getRandomColor());
  const [soul, setSoul] = useState(getRandomColor());
  const [modelKey, setModelKey] = useState(0);

  const [language, setLanguage] = useState("en");
  const translations = {
    en: {
      colorChooser: "Color chooser",
      main: "Main",
      stripes: "Stripes",
      soul: "Soul",
      resetColors: "Reset colors",
      getRandom: "Get Random"
    },
    es: {
      colorChooser: "Selector de color",
      main: "Principal",
      stripes: "Rayas",
      soul: "Suela",
      resetColors: "Restablecer colores",
      getRandom: "Obtener aleatorio"
    },
  };

  function getRandomColors() {
    setMesh(getRandomColor());
    setStripes(getRandomColor());
    setSoul(getRandomColor());
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const translatedText = translations[language];

  const resetColors = () => {
    setMesh(defaultColors.mesh);
    setStripes(defaultColors.stripes);
    setSoul(defaultColors.soul);
  };

  const resetCanvas = () => {
    setModelKey((prevKey) => prevKey + 1);
  };


  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>Sneakers Showcase - FL Automations</title>
        <meta name="description" content="A sneakers showcase." />
        <meta name="author" content="FL Automations" />
      </Helmet>
      <Navbar />
      <Box className="wrapper" minH="100vh" bg="#6D74C5" color="#edf2f4" fontFamily="Arial" textAlign="center" py={5}>
        <Center>
          <VStack spacing={4}>
          <Box
              className="card"
              borderRadius="15px"
              boxShadow="0 10px 20px rgba(0, 0, 0, 0.2)"
              p="2rem"
              bg="#c5c8e8"
              maxW="80%"
            >
              <Box
                className="product-canvas"
                bg="#ffffff"
                boxShadow="0 8px 12px rgba(0, 0, 0, 0.2)"
                borderRadius="10px"
                mb="20px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxW="50vw"
                minW="100%"
              >
                <Canvas key={modelKey}>
                  <Suspense fallback={null}>
                    <ambientLight />
                    <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                    <Model customColors={{ mesh: mesh, stripes: stripes, soul: soul }} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Suspense>
                </Canvas>
              </Box>
              <Text fontSize="xl">{translatedText.colorChooser}</Text>
              <Flex className='colors' justifyContent="center" my={5} >
                <Box>
                  <Input
                    mx={1}
                    type="color"
                    id="mesh"
                    name="mesh"
                    value={mesh}
                    onChange={(e) => setMesh(e.target.value)}
                    style={{ appearance: 'none', width: '60px', height: '24px', borderRadius: '10%' }}
                  />
                  <Text htmlFor="mesh">{translatedText.main}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Input
                    type="color"
                    id="stripes"
                    name="stripes"
                    value={stripes}
                    onChange={(e) => setStripes(e.target.value)}
                    style={{ appearance: 'none', width: '60px', height: '24px', borderRadius: '10%' }}
                  />
                  <Text htmlFor="stripes">{translatedText.stripes}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Input
                    type="color"
                    id="soul"
                    name="soul"
                    value={soul}
                    onChange={(e) => setSoul(e.target.value)}
                    style={{ appearance: 'none', width: '60px', height: '24px', borderRadius: '10%' }}
                  />
                  <Text htmlFor="soul">{translatedText.soul}</Text>
                </Box>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Button w={"130px"} fontSize={9} m={2} p={5} bgColor="#6D74C5" color="white" onClick={resetColors}>
                  {translatedText.resetColors}
                </Button>
                <Button  w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={toggleLanguage}>
                  {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
                </Button>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Button w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={resetCanvas}>
                  {language === "en" ? "Reset Canvas" : "Reiniciar Canvas"}
                </Button>
                <Button w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={getRandomColors}>
                  {translatedText.getRandom}
                </Button>
              </Flex>
            </Box>
          </VStack>
        </Center>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;