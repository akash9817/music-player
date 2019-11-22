import React from 'react';
import classes from './Playlist.module.css';

const Playlist = (props) => {
  const cards =   props.playlist.map(i => {
        return(
           <div className={classes.card} key={i.id} onClick={() => props.cardClick(i.id)}> 
            <img src={i.albumCover}/>
           <div className={classes.info}> 
                <h4>{i.track}</h4>
                <p>{i.artist}</p>
            </div> 
           </div> 
        )  
    })
    return(
       <div className={classes.playlist}> 
        {cards}
        </div> 
    )
}

export default Playlist