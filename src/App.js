import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import 'tachyons';
import './App.css';
// let config = {
//   num: [4, 6],
//   rps: 0.5,
//   radius: [5, 40],
//   life: [1.5, 3],
//   v: [2, 3],
//   tha: [-40, 40],
//   // body: "./img/icon.png", // Whether to render pictures
//   // rotate: [0, 20],
//   alpha: [0.6, 0],
//   scale: [1, 0.1],
//   position: "center", // all or center or {x:1,y:1,width:100,height:100}
//   color: ["random", "#ff0000"],
//   cross: "dead", // cross or bround
//   random: 15,  // or null,
//   g: 5,    // gravity
//   // f: [2, -1], // force
//   onParticleUpdate: (ctx, particle) => {
//       ctx.beginPath();
//       ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
//       ctx.fillStyle = particle.color;
//       ctx.fill();
//       ctx.closePath();
//   }
// };


///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'x';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'sasa03';       
  const APP_ID = 'SmartBrain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';    
  const IMAGE_URL = imageUrl;
  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////
  
  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions
  
}

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  // calculateFaceLocation = (data) => {
  //   response.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputimage');
  //   const width = Number(image.width);
  //   const height = Number(image.width);
  //   return {
  //     leftcol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top.row * height,
  //     rightCol: width - (clarifaiFace.rightCol * width),
  //     bottomRow: height - (dlarifaiFace.bottom_row * height)
  //   }
  // }

  // displayFaceBox = (box) => {
  //   this.setState({box: box})
  // }

  // onInputChange = (event) => {
  //   this.setState({input: event.target.value});
  // }

  // onButtonSubmit = () => {
  //   this.setState({imageUrl: this.state.input});
  //   fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "face-detection", returnClarifaiRequestOptions(event.target.value))
  //   .then(response => response.json())

  //     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  //     .catch(err => console.log(err));
  // }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        {/* <ParticlesBg type="custom" config={config} bg={true} /> */}
        <ParticlesBg color="#ffffff" num={100} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
          ?  <div>
              <Logo />
              <Rank/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              {/* <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> */}
            </div>
          :(this.state.route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
