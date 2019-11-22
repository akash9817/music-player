import React from 'react';
import classes from './Player.module.css';

const Player = (props) => {
    return(
        <div className={classes.player}>      
     <div className={classes.coverImg}> 
      <img src={props.currentAudio.albumCover}/>
    </div> 
      <div className={classes.progress}  onClick={props.timeLine}>
        <div className={classes.playhead} style={props.playheadStyle}></div>
      </div>
      <div className={classes.controls}>
       <div className={classes.icon} style={props.containerStyle}><i className="fa fa-random" onClick={() => props.controlTrack('SHUFFLE')}></i></div> 
        <div className={classes.icon}><i className="fa fa-step-backward" onClick={() => props.controlTrack('PREVIOUS')}></i></div>
        <div className={classes.icon}>
        {props.status?
         <i className="fa fa-pause-circle-o" onClick={() => props.controlTrack('PAUSE')}></i>
         :
         <i className="fa fa-play-circle-o" onClick={() => props.controlTrack('PLAY')}></i>}
        </div>
       <div className={classes.icon}> <i className="fa fa-step-forward" onClick={() => props.controlTrack('NEXT')}></i></div>
       <div className={classes.icon} style={props.repeatStyle}><i className="fa fa-refresh" onClick={() => props.controlTrack('RELOAD')} ></i></div>
        
        </div>
      <h2>{props.currentAudio.track}</h2>
      <h3>{props.currentAudio.artist}</h3>
      </div>
    )
}

export default Player
