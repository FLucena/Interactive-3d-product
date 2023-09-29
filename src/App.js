import './index.css';
import {Suspense, useRef,useState} from 'react'
import { Canvas} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import { Helmet } from 'react-helmet';
import { ChakraProvider, Button } from "@chakra-ui/react";
import { CSSReset } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

const defaultColors = {
  mesh: "#ffffff",
  stripes: "#ffffff",
  soul: "#ffffff"
};

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
 
  const [mesh,setMesh] = useState("#ffffff");
  const [stripes,setStripes] = useState("#ffffff");
  const [soul,setSoul] = useState("#ffffff");

  const [language, setLanguage] = useState("en");
  const translations = {
    en: {
      colorChooser: "Color chooser",
      main: "Main",
      stripes: "Stripes",
      soul: "Soul",
      resetToDefault: "Reset to Default",
    },
    es: {
      colorChooser: "Selector de color",
      main: "Principal",
      stripes: "Rayas",
      soul: "Suela",
      resetToDefault: "Restablecer a predeterminado",
    },
  };
  
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const translatedText = translations[language];

  const resetColors = () => {
    setMesh(defaultColors.mesh);
    setStripes(defaultColors.stripes);
    setSoul(defaultColors.soul);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <div className="App">
        <Helmet>
          <title>Sneakers Showcase - FL Automations</title>
          <meta name="description" content="A sneakers showcase." />
          <meta name="author" content="FL Automations" />
        </Helmet>
          <div className="wrapper">
              <div className="card">
                  <div className="product-canvas">
                    <Canvas>
                        <Suspense fallback={null}>
                            <ambientLight />
                            <spotLight intensity={0.9} 
                                      angle={0.1} 
                                      penumbra={1} 
                                      position={[10,15,10]}
                                      castShadow />
                            <Model customColors={{mesh:mesh, stripes:stripes , soul:soul }}/>
                            <OrbitControls enablePan={true}
                                          enableZoom={true}
                                          enableRotate={true}/>
                        </Suspense>
                    </Canvas>
                  </div>
                  <h2>{translatedText.colorChooser}</h2>
                  <div className='colors'>
                      <div>
                          <input type="color" id="mesh" name="mesh"
                                value={mesh} 
                                onChange={(e) => setMesh(e.target.value)}/>
                          <label for="mesh">{translatedText.main}</label>
                        </div>

                      <div>
                          <input type="color" id="stripes" name="stripes"
                                  value= {stripes}
                                  onChange={(e) => setStripes(e.target.value)}/>
                          <label for="stripes">{translatedText.stripes}</label>
                      </div>
                      <div>
                          <input type="color" id="soul" name="soul"
                                  value={soul} 
                                  onChange={(e) => setSoul(e.target.value)}/>
                          <label for="soul">{translatedText.soul}</label>
                      </div>
                  </div>
                  <Button my={"2"} py={"2"} bgColor="#6D74C5" textColor={"white"} onClick={resetColors}>
                    {translatedText.resetToDefault}
                  </Button>
                  <Button my={"2"} py={"2"} bgColor="#6D74C5" textColor={"white"} onClick={toggleLanguage}>
                    {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
                  </Button>
              </div>
          </div>
      </div>
    </ChakraProvider>
  );
}

export default App;