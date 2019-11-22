import React, {Component} from 'react';
import './App.css';
import Playlist from './Playlist'
import axios from 'axios';
import Player from './Player';

class App extends Component {

  state={
    playlist:[],
    currentAudio:'',
    status:false,
    audio:this.audioRef,
    playhead:'',
    shuffle:{
      val:false,
      style:''
    },
    repeat:{
      val:false,
      style:''
    }
  }

  timeLine = (event) => {
    var per = event.nativeEvent.offsetX / event.target.offsetWidth
    this.audioRef.currentTime = per * this.audioRef.duration
  }
  update = (event) => {
    var playhead = event.target.currentTime/ event.target.duration * 100 + '%'
    this.setState({playhead})
  }
  controlTrack = (str) => {
    var playlist = this.state.playlist
    var id = this.state.currentAudio.id
    switch(str){
      case 'PLAY':
          this.setState({status:true})
          this.audioRef.play()
          console.log("played")
          break;
      case 'PAUSE':
          this.setState({status:false})
          this.audioRef.pause()
          break;
      case 'NEXT':
          if(parseInt(this.state.currentAudio.id) === playlist.length){
            id = 0
          }
          if(this.state.repeat.val){
            this.audioRef.currentTime = 0
           this.setState({status:true})
           this.audioRef.play()
           return
         }
          if(this.state.shuffle.val){
            id = Math.floor(Math.random() * (playlist.length))
           } 
          this.setState({currentAudio:playlist[id],status:true})
          this.audioRef.autoplay = true
          break;
      case 'PREVIOUS':
          if(this.state.currentAudio.id == playlist[0].id){
            id = 9
          }
          if(this.state.shuffle.val){
            id = Math.floor(Math.random() * (playlist.length))
            this.setState({currentAudio:playlist[id],status:true})
            this.audioRef.autoplay = true
            return
           }
           if(this.state.repeat.val){
             this.audioRef.currentTime = 0
             this.setState({status:true})
             this.audioRef.play()
            return
          }
          this.setState({currentAudio:playlist[id - 2],status:true}) 
          this.audioRef.autoplay = true
          break;
      case 'SHUFFLE':
          if(this.state.repeat.val){
            this.setState({repeat:{val:false,style:''}})
          }          
          var shuffleTog = this.state.shuffle.val
          this.setState({shuffle:{val:!shuffleTog,style:shuffleTog?'':'#0e0e78'}})
          break;
      case 'RELOAD':
        if(this.state.shuffle.val){
          this.setState({shuffle:{val:false,style:''}})
        }
          var repeatTog = this.state.repeat.val
          this.setState({repeat:{val:!repeatTog,style:repeatTog?'':'#0e0e78'}})
          break;
    }

  }
  trackEnded =  () => {
    var playlist = this.state.playlist
    var id = this.state.currentAudio.id
    if(parseInt(this.state.currentAudio.id) === playlist.length){
      id = 0
    }
     if(this.state.shuffle.val){
      id = Math.floor(Math.random() * (playlist.length))
     }
    if(this.state.repeat.val){
      this.audioRef.play()
      return
    }
    this.setState({currentAudio:playlist[id],status:true})
    this.audioRef.autoplay = true
  }
  cardClick = (id) => {
    const playlist = this.state.playlist
    this.setState({currentAudio:playlist[id - 1],status:true})
    this.audioRef.autoplay = true
  }
  componentDidMount(){
    axios.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist")
    .then(res => {
      this.setState({playlist:res.data,
        coverImg:res.data[0].albumCover,
        artist:res.data[0].artist,
        track:res.data[0].track,
        currentAudio:res.data[0]})
    })
  }
  render(){
    if(this.state.playlist.length == null){
      return null
     }
     const styles = {
      containerStyle: {
        color: this.state.shuffle.style
      },
      repeatStyle:{
        color: this.state.repeat.style
      },
      playheadStyle:{
        width:this.state.playhead
      }
    };
    const { containerStyle,repeatStyle,playheadStyle } = styles;
  return (
    <div className="App">
       <audio ref={(input) => {this.audioRef = input}} src={this.state.currentAudio.file} autoPlay={false}
     onEnded={this.trackEnded} onTimeUpdate={this.update}/>
     <div className="left"> 
     <Player 
     containerStyle={containerStyle} 
     repeatStyle={repeatStyle} 
     currentAudio={this.state.currentAudio}
     timeLine={this.timeLine}
     status={this.state.status}
     controlTrack={this.controlTrack}
     playheadStyle={playheadStyle}
     playhead={this.state.playhead}/>
    </div> 
      <div className="playlist">
         <Playlist playlist={this.state.playlist} cardClick={this.cardClick} /> 
      </div> 
    </div>
  );
  }
}
export default App;
