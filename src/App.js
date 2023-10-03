import html2canvas from 'html2canvas';
import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Helmet } from 'react-helmet';
import { ChakraProvider, Button, Box, Center, Text, Flex, Spacer, VStack, Input, CloseButton } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Footer from './Footer';
import Navbar from './Navbar';
import { ReactSVG } from 'react-svg';
import Draggable from 'react-draggable';

const DEFAULT_COLORS = {
  mesh: "#ffffff",
  stripes: "#ffffff",
  soul: "#ffffff",
};

const theme = extendTheme({});

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

  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  const closeTooltip = () => {
    setIsTooltipVisible(false);
  };

  const canvasRef = useRef();
  const [screenshotURL, setScreenshotURL] = useState(null);

  const captureScreenshot = () => {
    if (!is3DLoaded) {
      return;
    }

    setTimeout(() => {
      const canvas = canvasRef.current;
      html2canvas(canvas).then((canvas) => {
        const screenshot = canvas.toDataURL('image/png');
        setScreenshotURL(screenshot);
      });
    }, 1000);
  };

  const [colors, setColors] = useState({
    mesh: getRandomColor(),
    stripes: getRandomColor(),
    soul: getRandomColor(),
  });

  const [modelKey, setModelKey] = useState(0);

  const [language, setLanguage] = useState("en");
  const translations = {
    en: {
      colorChooser: "Color chooser",
      main: "Main",
      stripes: "Stripes",
      soul: "Soul",
      resetColors: "Reset colors",
      getRandom: "Get Random",
    },
    es: {
      colorChooser: "Selector de color",
      main: "Principal",
      stripes: "Rayas",
      soul: "Suela",
      resetColors: "Restablecer colores",
      getRandom: "Obtener aleatorio",
    },
  };

  function getRandomColors() {
    setColors({
      mesh: getRandomColor(),
      stripes: getRandomColor(),
      soul: getRandomColor(),
    });
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const translatedText = translations[language];

  const resetColors = () => {
    setColors(DEFAULT_COLORS);
  };

  const resetCanvas = () => {
    setModelKey((prevKey) => prevKey + 1);
  };

  const [is3DLoaded, setIs3DLoaded] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>Sneakers Showcase - FL Automations</title>
        <meta name="description" content="A sneakers showcase." />
        <meta name="author" content="FL Automations" />
      </Helmet>
      <Navbar />
      <Box
        className="wrapper"
        minH="100vh"
        bg="#6D74C5"
        color="#edf2f4"
        fontFamily="Arial"
        textAlign="center"
        py={5}
        position="relative"
      >
        {isTooltipVisible && (
          <Draggable
            handle=".handle"
            bounds="parent"
            onMouseDown={(e) => {
              if (e.detail === 2) {
                closeTooltip();
              }
            }}
          >
            <Box
              className="handle"
              position="absolute"
              bottom="10px"
              right="10px"
              padding="40px"
              borderRadius="5px"
              color="white"
              cursor="pointer"
              zIndex="1001"
              width="440px"
              height="150px"
              transition="background 0.3s"
              background="rgba(0, 0, 0, 0.5)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <CloseButton onClick={closeTooltip} position="absolute" top="5px" right="5px" />
              {language === 'en'
              ? (
                <span>
                  Move: right click / two finger swipe <br />
                  Rotate: hold left click / one finger swipe <br />
                  Zoom: mouse scroll / two finger spread
                </span>
              )
              : <span>
                  Mover: click derecho / deslizar dos dedos <br />
                  Rotar: mantener click izquierdo / deslizar un dedo <br />
                  Zoom: rueda del ratón / separar dos dedos
              </span>
            }
            </Box>
          </Draggable>
        )}
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
                <Canvas
                  key={modelKey}
                  ref={canvasRef}
                  onCreated={({ gl }) => {
                    gl.setPixelRatio(window.devicePixelRatio);
                    setIs3DLoaded(true);
                  }}
                  gl={{ preserveDrawingBuffer: true }} 
                >
                  <Suspense fallback={null}>
                    <ambientLight />
                    <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                    <Model customColors={{ ...colors }} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Suspense>
                </Canvas>
              </Box>
              <Button
                w={"130px"}
                fontSize={10}
                mt={4}
                mb={5}
                p={5}
                bgColor="#6D74C5"
                color="white"
                onClick={captureScreenshot}
              >
                {language === 'en'
              ? (
                <span>
                  Capture Screenshot
                </span>
              )
              : <span>
                  Captura de pantalla
              </span>
            }
              </Button>
              {screenshotURL && (
                <div style={{ maxWidth: '30vw' }}>
                  <img src={screenshotURL} alt="Screenshot" />
                </div>
              )}

              <Text mt={5} fontSize="xl">{translatedText.colorChooser}</Text>
              <Flex className='colors' justifyContent="center" my={5} >
                <Box>
                  <Input
                    mx={1}
                    type="color"
                    id="mesh"
                    name="mesh"
                    value={colors.mesh}
                    onChange={(e) => setColors({ ...colors, mesh: e.target.value })}
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
                    value={colors.stripes}
                    onChange={(e) => setColors({ ...colors, stripes: e.target.value })}
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
                    value={colors.soul}
                    onChange={(e) => setColors({ ...colors, soul: e.target.value })}
                    style={{ appearance: 'none', width: '60px', height: '24px', borderRadius: '10%' }}
                  />
                  <Text htmlFor="soul">{translatedText.soul}</Text>
                </Box>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Button w={"130px"} fontSize={9} m={2} p={5} bgColor="#6D74C5" color="white" onClick={resetColors}>
                  <ReactSVG
                    src="color.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '20px');
                      svg.setAttribute('height', '20px');
                    }}
                  />
                </Button>
                <Button  w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={toggleLanguage}>
                  <ReactSVG
                    src="lang.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '20px');
                      svg.setAttribute('height', '20px');
                    }}
                  />
                </Button>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Button w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={resetCanvas}>
                  <ReactSVG
                    src="reset.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '20px');
                      svg.setAttribute('height', '20px');
                    }}
                  />
                </Button>
                <Button w={"130px"} fontSize={10} m={2} p={5} bgColor="#6D74C5" color="white" onClick={getRandomColors}>
                  <ReactSVG
                    src="shuffle.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '20px');
                      svg.setAttribute('height', '20px');
                    }}
                  />
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