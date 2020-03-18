import React from 'react';
import style from './App.module.css';
import SongInfo from "./components/songInfo";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            error:null,
            tracks:[],
            activeId:null,
            sortBy: 'default'
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        this.fetchData()
    }

     fetchData= async () =>{
         let topList;
         let tracks =[];
         try{
             const data = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
             topList = await data.json();
             tracks = topList.tracks.data.map(track=>track);
             this.setState(state=>({loading:false, tracks:state.tracks.concat(tracks)}))
         }catch (e) {
             this.setState({loading:false,error:'Unable to fetch tracks!'})
             console.log(e);

         }
    };

    showInfo= (id) =>{
        this.setState({activeId:id})
    };

    closeInfo= () =>{
        this.setState({activeId:null});
    };
    handleSelect= (event) =>{
        let sorting = [].concat(...this.state.tracks)
        if(event.target.value==='durationAsc') sorting.sort((a,b)=>a.duration-b.duration);
        else if(event.target.value==='durationDsc') sorting.sort((a,b)=>b.duration-a.duration);
        else sorting.sort((a,b)=>a.position-b.position);
        this.setState({sortBy:event.target.value, tracks:sorting})
    }

  render() {
      if(this.state.loading) return <h2 className={style.loading}>Loading...</h2>;
      if(this.state.error)return <div className={style.error}><h2>Error!</h2><p>{this.state.error}</p></div>;
      return (
          <div className={style.App} >
              <header className={style.header}>
                  <h1>Top Pop</h1>
                <div className={style.sort}>
                    <label htmlFor='sort' >Sort top list by: </label>
                    <select name='sort' onChange={this.handleSelect} value={this.state.sortBy}>
                      <option value='default'>Default</option>
                      <option value='durationAsc'>Shortest</option>
                      <option value='durationDsc'>Longest</option>
                    </select>
                </div>
              </header>
              <ul className={style.list}>
              {this.state.tracks.map(track=>{
                  return(<li key={track.id} >
                      <div className={style.track} onClick={()=>this.showInfo(track.id)}>
                          <div className={style.ranking}>{track.position}</div>
                          <div className={style.name}>{track.title}</div>
                      </div>
                      {track.id===this.state.activeId?
                          <SongInfo modal={this.state.activeId} closeInfo={this.closeInfo} artist={track.artist.name} duration={track.duration} position={track.position} title={track.title}/>:null}
                  </li>)
              })}
              </ul>
          </div>

      );
  }


}

export default App;
