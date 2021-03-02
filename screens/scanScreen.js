
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import * as Permissions from "expo-permissions";
import {BarcodeScanner} from "expo-barcode-scan"

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermision:null,
            scanned:false,
            scannedData:'',
            buttonState:"normal"
        }
    }

    getCameraPermision=async()=>{
        
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermision:status==="granted",
            scanned:"false",
            buttonState:"clicked"
            
        })
        alert(this.state.hasCameraPermision)
    }

    handleBarCodeScan=async({type,data})=>{
        this.setState({
            scanned:"true",
            buttonState:"normal",
            scannedData:data,

        });
        alert('Qr code with ${type} and ${data} has scanned')
    }
  render(){
      const hasCameraPermision=this.state.hasCameraPermision;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      const scannedData=this.state.scannedData;
      if(buttonState==="clicked"&&hasCameraPermision){
          return(
              <BarcodeScanner style={StyleSheet.absoluteFillObject}
               onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}></BarcodeScanner>
          )
      }
    return(
        <View style={styles.container}>
            <Text>Scan the QR Code/Barcode to purchase items</Text>
            <Text style={styles.openingText}>{hasCameraPermision===true?this.state.scannedData:"requested to ask for permisions again"}</Text>
            <TouchableOpacity onPress={this.getCameraPermision} style={styles.requestButton}></TouchableOpacity>
            <Image
                style={styles.logo}
                source={{
                    uri:"./assest/scanner.jpg"
                }}
            ></Image>
        </View>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openingText:{
    fontSize:15,
    textDecorationLine:"underline",
  },
  requestButton:{
    backgroundColor:"grey",
    padding:10,
    margin:20,
  },
  logo:{
    width: 50,
    height: 200,
    resizeMode: 'stretch',
    margin:10,
    padding:10,
  }
  
});
