import React from 'react'
import axios from 'axios'

class ExaminationReport extends React.Component {

    state = {
        diagnosisList: {},
        medicationList: {}
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/diagnoses/all').then( response => {
            this.setState({
                diagnosisList: response.data
            })
            console.log("list", this.state.diagnosisList)
        })
    }

    createDiagnosisSelectItems() {
        let items = []; 
        var size = Object.keys(this.state.diagnosisList).length;

        items.push(<option class = "form-control selectpicker" data-live-search = "true" 
                        key={size} name='doctorId' value="" selected="selected"> No diagnosis </option>);
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} data-tokens={this.state.diagnosisList[i].name} name = "id" 
             value={this.state.diagnosisList[i].id}> {this.state.diagnosisList[i].name} </option>);   
        }
        return items;
    }  

    render() {
        return (
            <div> 
                <form>
                <div class="form-group row">
                    <label for="" class="col-sm-2 form-control-label">Diagnosis</label>
                    <div class="col-sm-10">
                    <select class="form-control selectpicker" id="select-diagnosis" data-live-search="true">
                        {this.createDiagnosisSelectItems()}
                    </select>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default ExaminationReport