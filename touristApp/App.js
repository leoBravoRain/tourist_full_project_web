import React from 'react';
import { Alert, NetInfo, Button, StyleSheet, Text, View, WebView, Dimensions } from 'react-native';

// Variable para obtener window
const window = Dimensions.get('window');

// Clase principal
export default class App extends React.Component {

  // constructor
  constructor(props) {

      super(props);

      // Estados del componente
      this.state = {

        // Estado de conexion
        status: false,

        // Mostrar pagina de tourist
        mostrarPagina: false,

      };

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);

  };

  // Funcion que se ejecuta una vez que se renderizo el componente
  componentDidMount() {

    // Todo el codigo de coneccion se copio desde internet
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(

      (isConnected) => { this.setState({ status: isConnected }); }

    );

  }

  // Funcion que se ejecuta cuando se elimina el view
  componentWillUnmount() {

    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);

  }

  // Funcion para gestionar el cambio de estado de conexion
  handleConnectionChange = (isConnected) => {

    this.setState({ status: isConnected });

  }

  // Metodo para manejar el click del boton
  handleClick(){

    // Si esta conectado a internet
    if(this.state.status){

      // Cambiar estado para mostrar pagina
      this.setState({

        mostrarPagina: true,

      });

    }

    // Si no esta conectado
    else{

      // Mostrar mensaje a usuario para que se conecte a internet
      Alert.alert("Por favor, conectate a internet");

    };
      

  };

  // Renderizar
  render() {

    // Url para cargar la pagina
    const url = 'https://tourist.pythonanywhere.com';

    // Se retorna el contenido a renderizar
    return (

      <View style={styles.container}>

        {this.state.mostrarPagina ? 

          <WebView

            source = {{url: url}}

            style = { styles.webViewStyle }

            bounces = { false }

          />

          :

          <Button

            onPress = { this.handleClick }

            title = "Comenzar a explorar el mundo"

          />

        }

      </View>

    );

  }

}

// Estilos de los componentes
const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  webViewStyle: {

    marginTop: 30, 
    flex: 1,
    width: window.width,
    height: window.height,

  },

  topbar: {

    marginTop: 20, 

  }

});
