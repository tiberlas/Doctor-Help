import React from 'react'
import axios from 'axios'
import Select from 'react-select'

const fontStyles = {
    option: provided => ({
    ...provided,
    color: 'black'
    }),
    control: provided => ({
    ...provided,
    color: 'black'
    }),
    singleValue: provided => ({
    ...provided,
    color: 'black'
    })
}

class ExaminationReport extends React.Component {

    state = {
        diagnosisList: {},
        medicationList: {},
        diagnosisOptions: [],
        medicationOptions: [],
        
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/diagnoses/all').then( response => {
            this.setState({
                diagnosisList: response.data
            })
            let items = []; 
            var size = Object.keys(this.state.diagnosisList).length;
    
            items.push({
                label: 'No diagnosis',
                value: 'No diagnosis'
            })
            for (let i = 0; i < size; i++) {
                 let option = {
                     label: this.state.diagnosisList[i].name,
                     value: this.state.diagnosisList[i].name
                 }             
                 items.push(option);
            }

            this.setState({
                diagnosisOptions: items
            })
        })

        axios.get('http://localhost:8080/api/medication/all').then(response => {
            this.setState({medicationList: response.data})

            let items = []; 
            var size = Object.keys(this.state.medicationList).length;

            for (let i = 0; i < size; i++) {
                 let option = {
                     label: this.state.medicationList[i].name,
                     value: this.state.medicationList[i].name
                 }             
                 items.push(option);
            }

            this.setState({
                medicationOptions: items
            })
        })
    }


    render() {
        return (
            <div> 
                <form>
                <div class="form-group row">
                    <div class="col-sm-10">
                    <label for="diagnosisSelect">Diagnosis</label>
                    <Select 
                        id="diagnosisSelect" 
                        styles={fontStyles} 
                        className="basic-single" 
                        classNamePrefix="select" 
                        name="diagnosis" 
                        options={this.state.diagnosisOptions} 
                        defaultValue={this.state.diagnosisOptions[0]} 
                        onChange = {this.props.handleDiagnosisChange}
                    />
                    <br/>
                    <label for="medicationSelect"> Medication </label>
                    <Select
                        id="medicationSelect"
                        isMulti
                        name="medication"
                        options={this.state.medicationOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.props.handleMedicationChange}
                        styles={fontStyles}
                    />

                    <br/>   
                    <label for="doctorNotes"> Additional notes </label>
                    <br/>
                    <textarea id="doctorNotes" placeholder="Write any appointment notes here..." onChange={this.props.handleNotesChange}/>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default ExaminationReport