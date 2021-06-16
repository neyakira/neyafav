import {Component} from "react";
import {Button} from "primereact/button";
import "./Fav.css";

class Fav extends Component{

    render() {

        let url = "url('"+this.props.icon+"')";

        return (
            <div className="Fav" style={{backgroundImage:url}} onClick={() => window.location = this.props.url}>
                <div style={{display:'flex'}}>
                    <div style={{flex:1}} />
                    <Button icon="pi pi-times" className="p-button-rounded p-button-sm p-button-danger" onClick={(e) => {e.stopPropagation();this.props.onDelete()}}/>
                </div>
                <div style={{flex:1}} />
                <div className="infos">
                    <span>{this.props.name}</span>
                </div>

            </div>
        )
    }


}

export default Fav;