import React from 'react';
import style from './App.module.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            error:null,
            tracks:[],
            modal:false
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        this.fetchData()
    }

     fetchData=async ()=>{
         let topList;
         let tracks =[];
         try{
             const data = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
             topList = await data.json();
             tracks = topList.tracks.data.map(track=>track)
             this.setState(state=>({loading:false, tracks:state.tracks.concat(tracks)}))
         }catch (e) {
             this.setState({loading:false,error:'Unable to fetch tracks!'})
             console.log(e);

         }
    };



  render() {
      if(this.state.loading) return <h2>Loading...</h2>;
      if(this.state.error)return <h2>{this.state.error}</h2>;
      return (
          <div className={style.App} >
              {this.state.tracks.map(track=>{
                  return(<div key={track.id} className={style.track}>
                        <div>{track.title}</div>
                        <div>{track.duration}s</div>
                  </div>)
              })}
          </div>
      );
  }


}

export default App;
