import './App.css';
import 'primereact/resources/themes/md-dark-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Component} from "react";
import Fav from "./Fav";
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import shortid from 'shortid';
import ls from 'local-storage';


class App extends Component {

    constructor() {
        super();
        this.state = {
            visible:false,
            name:'',
            url:'',
            icon:'',

            data:[],
        }
    }

    componentDidMount() {

        let data = ls.get('data');
        data = data || [];

        this.setState({data:data});
    }

    add = () => {
        let data = this.state.data;
        data.push({
            name:this.state.name,
            url:this.state.url,
            icon:this.state.icon,
            key:shortid.generate()
        });

        ls.set('data', data);

        this.setState({visible: false, data:data});
    }

    onDelete = (itemToDelete) => {
        let newData = [];
        this.state.data.forEach((item) => {
            if (item.key === itemToDelete.key) {
                return;
            }
            newData.push(item);
        });
        ls.set('data', newData);
        this.setState({data:newData});
    }

    render() {
        return (
            <div className="App">

                <div className='FavContainer'>
                    {this.state.data && this.state.data.map((item) => {
                        return <Fav key={item.key} url={item.url} icon={item.icon} name={item.name} onDelete={() => this.onDelete(item)}/>
                    })}
                </div>
                <Button icon="pi pi-plus" onClick={() => this.setState({ visible: true })} className="p-mr-2 btnadd" />

                <Sidebar visible={this.state.visible} position="top" onHide={() => this.setState({ visible: false })}>
                    <div className='sidebaradd'>
                        <h3>Ajouter</h3>

                        <span className="p-float-label">
                            <InputText id="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                            <label htmlFor="username">Nom</label>
                        </span>

                        <span className="p-float-label">
                            <InputText id="name" value={this.state.url} onChange={(e) => this.setState({url: e.target.value})} />
                            <label htmlFor="username">URL</label>
                        </span>

                        <span className="p-float-label">
                            <InputText id="name" value={this.state.icon} onChange={(e) => this.setState({icon: e.target.value})} />
                            <label htmlFor="username">Icon</label>
                        </span>

                        <Button icon="pi pi-plus" onClick={() => this.add()} className="p-mr-2 btnadd" />
                    </div>
                </Sidebar>
            </div>
        );
    }


}

export default App;
