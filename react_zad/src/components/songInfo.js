import React from "react";
import style from './modal.module.css'

const SongInfo = (props) =>{
    let sec = props.duration %60
    let min = props.duration /60
    let duration = '0'+Math.floor(min)+':'+(sec>10 ? sec : '0'+sec);

    if(props.modal)return(
        <div className={style.songModal}>
            <div className={style.song}>
                <div className={style.infoItem}> <h2>{props.title}</h2></div>
                <div className={style.infoItem}>Ranking <h3>{props.position}</h3></div>

                <div className={style.infoItem}>Artist <h3>{props.artist}</h3></div>
                <div className={style.infoItem}>Duration: <h3>{duration}</h3></div>
                <button className={style.closeButton} onClick={()=>props.closeInfo()}>Close</button>
            </div>
        </div>);
    else return null
};

export default SongInfo