import React, {Component} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'

class Emerson extends Component {

constructor(props){
  super(props);

  this.state = {
    horas: 0,
    minutos: 0,
    segundos:0,
    ativo: false,
    voltas: []
  }
  pulsoDeClock = this.pulsoDeClock.bind(this);
  iniciarRelogio= this.iniciarRelogio.bind(this);
  pararRelogio = this.pararRelogio.bind(this);
  marcaVolta = this.marcaVolta.bind(this);
  zerarRelogio = this.zerarRelogio.bind(this);
}
iniciarRelogio(){
  if(this.state.ativo){
    this.setState({clock : setInterval(this.pulsoDeClock,1000)})
    this.setState({ativo: true})
  }
}
  pulsoDeClock(){
    var h = this.state.horas;
    var m = this.state.minutos;
    var s = this.state.segundos;

    if (s<59){
      s++;
    }else {
      s=0;
      if(m < 59){
        m++;
      }else {
        m=0 
        h++
      }
    }

    this.setState({segundos: s, minutos: m, horas: h})
  }

  pararRelogio(){
    if(this.state.ativo){
      clearInterval(this.state.clock)
      this.setState({ativo:false})
    }
  }

  marcaVolta(){
    var textCrono = this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":"+ this.formatar(this.state.segundos)+"\n"
    this.state.voltas.push(textCrono);
    this.forceUpdate();
  }

  formatar(t){
    return (t<10) ? "0" +t.toString() : t.toString();
  }

  zerarRelogio(){
    this.pararRelogio();
    this.setState({segundoss: 0, minutos:0, horas: 0})
    if (this.state.voltas.length>0){
      this.state.voltas.push(" -------- \n ")
    }
  }
  render()
  {
    var txtH = this.formatar(this.state.horas);
    var txtM = this.formatar(this.state.minutos);
    var txtS = this.formatar(this.state.segundos);

    return (
      <ScrollView>
        <View>
          <Text>Cronometro</Text>
          <Text>{txtH}:{txtM}:{txtS}</Text>
        </View>
        <View>
          <Button onPress={(this.state.ativo ? this.pararRelogio : this.iniciarRelogio)}
          title={this.state.ativo ? "Pausar" : "Comerçar"} />
    
          <Button onPress={(this.marcaVolta)} title="Marca Volta"/>

          <Button onPress={this.zerarRelogio} title='Zerar' />
        </View>
        <View>
          <Text>
            {this.state.voltas}
          </Text>
        </View>
        </ScrollView>
      )
  }


}
